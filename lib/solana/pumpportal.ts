import { VersionedTransaction } from "@solana/web3.js";
import { connection, loadTreasury, PUMPPORTAL_API_KEY, REWARD_MINT, workerConfig } from "./config";

type PumpPortalBody = {
  publicKey: string;
  action: "collectCreatorFee" | "buy";
  mint?: string;
  denominatedInSol?: "true";
  amount?: number;
  slippage?: number;
  priorityFee?: number;
  pool?: "pump" | "auto";
};

async function signAndSendLocal(body: PumpPortalBody) {
  const treasury = loadTreasury();

  if (workerConfig.dryRun) {
    console.log("[dry-run] PumpPortal action", body);
    return `dry-run:${body.action}:${Date.now()}`;
  }

  const response = await fetch("https://pumpportal.fun/api/trade-local", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(PUMPPORTAL_API_KEY ? { Authorization: `Bearer ${PUMPPORTAL_API_KEY}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`PumpPortal ${body.action} failed: ${response.status} ${await response.text()}`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  const transaction = VersionedTransaction.deserialize(bytes);
  transaction.sign([treasury]);

  const signature = await connection.sendRawTransaction(transaction.serialize(), { maxRetries: 3 });
  await connection.confirmTransaction(signature, "confirmed");
  return signature;
}

export async function claimCreatorFees() {
  return signAndSendLocal({
    publicKey: loadTreasury().publicKey.toBase58(),
    action: "collectCreatorFee",
    pool: "pump",
  });
}

export async function buyRewardToken(solAmount: number) {
  return signAndSendLocal({
    publicKey: loadTreasury().publicKey.toBase58(),
    action: "buy",
    mint: REWARD_MINT.toBase58(),
    denominatedInSol: "true",
    amount: solAmount,
    slippage: workerConfig.buySlippage,
    priorityFee: workerConfig.priorityFee,
    pool: "auto",
  });
}
