import { ComputeBudgetProgram, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { connection, loadTreasury, REWARD_MINT, workerConfig } from "./config";
import { getDecimals, type Holder } from "./holders";

export type Allocation = {
  owner: string;
  amountRaw: bigint;
  amountUi: number;
};

export function allocate(holders: Holder[], totalRaw: bigint, payoutRaw: bigint, rewardDecimals: number): Allocation[] {
  if (totalRaw === 0n || payoutRaw === 0n) {
    return [];
  }

  const allocations = holders.map((holder) => {
    const weighted = holder.raw * payoutRaw;
    return {
      owner: holder.owner,
      amountRaw: weighted / totalRaw,
      remainder: weighted % totalRaw,
    };
  });

  const distributed = allocations.reduce((sum, allocation) => sum + allocation.amountRaw, 0n);
  let leftover = payoutRaw - distributed;

  allocations.sort((a, b) => (b.remainder > a.remainder ? 1 : b.remainder < a.remainder ? -1 : 0));
  for (let index = 0; leftover > 0n && index < allocations.length; index += 1, leftover -= 1n) {
    allocations[index].amountRaw += 1n;
  }

  return allocations
    .filter((allocation) => allocation.amountRaw > 0n)
    .map((allocation) => ({
      owner: allocation.owner,
      amountRaw: allocation.amountRaw,
      amountUi: Number(allocation.amountRaw) / 10 ** rewardDecimals,
    }));
}

export async function distribute(allocations: Allocation[]) {
  const treasury = loadTreasury();
  const rewardDecimals = await getDecimals(REWARD_MINT);
  const source = await getAssociatedTokenAddress(REWARD_MINT, treasury.publicKey);

  const signatures: string[] = [];
  const paid: Allocation[] = [];
  const failed: { owner: string; amountUi: number; reason: string }[] = [];

  for (let index = 0; index < allocations.length; index += workerConfig.transfersPerTx) {
    const batch = allocations.slice(index, index + workerConfig.transfersPerTx);

    if (workerConfig.dryRun) {
      const signature = `dry-run:transfer:${Math.floor(index / workerConfig.transfersPerTx)}:${Date.now()}`;
      signatures.push(signature);
      paid.push(...batch);
      continue;
    }

    const instructions: TransactionInstruction[] = [
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: Math.floor(workerConfig.priorityFee * 1_000_000_000 * 100),
      }),
    ];

    for (const allocation of batch) {
      const owner = new PublicKey(allocation.owner);
      const destination = await getAssociatedTokenAddress(REWARD_MINT, owner);

      if (await accountMissing(destination)) {
        instructions.push(createAssociatedTokenAccountInstruction(treasury.publicKey, destination, owner, REWARD_MINT));
      }

      instructions.push(createTransferInstruction(source, destination, treasury.publicKey, allocation.amountRaw, [], TOKEN_PROGRAM_ID));
    }

    const transaction = new Transaction().add(...instructions);
    transaction.feePayer = treasury.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.sign(treasury);

    try {
      const signature = await connection.sendRawTransaction(transaction.serialize(), { maxRetries: 3 });
      await connection.confirmTransaction(signature, "confirmed");
      signatures.push(signature);
      paid.push(...batch);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Transfer batch failed";
      console.error(`Batch ${Math.floor(index / workerConfig.transfersPerTx)} failed:`, error);
      failed.push(...batch.map((allocation) => ({ owner: allocation.owner, amountUi: allocation.amountUi, reason })));
    }
  }

  void rewardDecimals;
  return { signatures, paid, failed };
}

async function accountMissing(ata: PublicKey) {
  try {
    await getAccount(connection, ata);
    return false;
  } catch {
    return true;
  }
}
