import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { hasDatabaseUrl, prisma } from "../lib/db";
import { allocate, distribute } from "../lib/solana/distribute";
import { connection, loadTreasury, REWARD_MINT, workerConfig } from "../lib/solana/config";
import { snapshotHolders, getDecimals } from "../lib/solana/holders";
import { buyRewardToken, claimCreatorFees } from "../lib/solana/pumpportal";

type CycleStatus = "STARTED" | "IDLE" | "COMPLETED" | "PARTIAL" | "FAILED";

export async function runCycle() {
  const treasury = loadTreasury();
  const rewardDecimals = await getDecimals(REWARD_MINT);
  const rewardAta = await getAssociatedTokenAddress(REWARD_MINT, treasury.publicKey);
  const cycleRun = await createCycleRun();

  try {
    const claimSig = await claimCreatorFees();
    const lamports = await connection.getBalance(treasury.publicKey);
    const sol = lamports / LAMPORTS_PER_SOL;

    if (sol - workerConfig.reserveSol < workerConfig.minClaimSol) {
      await completeCycleRun(cycleRun?.id, "IDLE", {
        claimSignature: claimSig,
        treasurySol: sol,
        message: `${sol.toFixed(4)} SOL below threshold`,
      });
      return;
    }

    const before = await tokenBalance(rewardAta);
    const buySol = Number((sol - workerConfig.reserveSol).toFixed(6));
    const buySig = await buyRewardToken(buySol);
    const after = workerConfig.dryRun ? before + BigInt(Math.floor(buySol * 1_000_000_000)) : await tokenBalance(rewardAta);
    const payoutRaw = after - before;

    if (payoutRaw <= 0n) {
      await completeCycleRun(cycleRun?.id, "IDLE", {
        claimSignature: claimSig,
        buySignature: buySig,
        treasurySol: sol,
        message: "Buy produced no reward tokens",
      });
      return;
    }

    const { holders, totalRaw } = await snapshotHolders();
    if (holders.length === 0) {
      await completeCycleRun(cycleRun?.id, "IDLE", {
        claimSignature: claimSig,
        buySignature: buySig,
        treasurySol: sol,
        message: "No eligible KINSCLUB holders",
      });
      return;
    }

    const allocations = allocate(holders, totalRaw, payoutRaw, rewardDecimals);
    const { signatures, paid, failed } = await distribute(allocations);
    const distributedUi = paid.reduce((sum, allocation) => sum + allocation.amountUi, 0);
    const status: CycleStatus = failed.length > 0 ? "PARTIAL" : "COMPLETED";

    if (hasDatabaseUrl && cycleRun) {
      await persistCycle({
        cycleRunId: cycleRun.id,
        status,
        claimSignature: claimSig,
        buySignature: buySig,
        transferSignatures: signatures,
        holders,
        totalRaw,
        paid,
        failed,
        distributedUi,
        treasurySol: sol,
      });
    }

    console.log(`cycle ${status.toLowerCase()}: ${distributedUi} KINS to ${paid.length} holders`);
  } catch (error) {
    await completeCycleRun(cycleRun?.id, "FAILED", {
      message: error instanceof Error ? error.message : "Cycle failed",
    });
    throw error;
  }
}

async function tokenBalance(ata: PublicKey) {
  try {
    const account = await getAccount(connection, ata);
    return account.amount;
  } catch {
    return 0n;
  }
}

async function createCycleRun() {
  if (!hasDatabaseUrl) {
    return null;
  }

  const last = await prisma.cycleSnapshot.findFirst({ orderBy: { cycleId: "desc" } });
  return prisma.rewardCycleRun.create({
    data: {
      cycleId: (last?.cycleId ?? 0) + 1,
      status: "STARTED",
      dryRun: workerConfig.dryRun,
    },
  });
}

async function completeCycleRun(
  id: string | undefined,
  status: CycleStatus,
  data: {
    claimSignature?: string;
    buySignature?: string;
    treasurySol?: number;
    message?: string;
  },
) {
  if (!hasDatabaseUrl || !id) {
    return;
  }

  await prisma.rewardCycleRun.update({
    where: { id },
    data: {
      status,
      claimSignature: data.claimSignature,
      buySignature: data.buySignature,
      treasurySol: data.treasurySol,
      errorMessage: data.message,
      completedAt: new Date(),
    },
  });
}

async function persistCycle(args: {
  cycleRunId: string;
  status: CycleStatus;
  claimSignature?: string;
  buySignature?: string;
  transferSignatures: string[];
  holders: { owner: string; balance: number; raw: bigint }[];
  totalRaw: bigint;
  paid: { owner: string; amountUi: number }[];
  failed: { owner: string; amountUi: number; reason: string }[];
  distributedUi: number;
  treasurySol: number;
}) {
  const { cycleRunId, status, claimSignature, buySignature, transferSignatures, holders, totalRaw, paid, failed, distributedUi, treasurySol } = args;
  const last = await prisma.cycleSnapshot.findFirst({ orderBy: { cycleId: "desc" } });
  const cycleId = (last?.cycleId ?? 0) + 1;
  const previousTotal = last ? Number(last.totalDistributed) : 0;

  const operations = [
    prisma.rewardCycleRun.update({
      where: { id: cycleRunId },
      data: {
        cycleId,
        status,
        claimSignature,
        buySignature,
        transferSignatures,
        treasurySol,
        kinsDistributed: distributedUi,
        recipients: paid.length,
        completedAt: new Date(),
      },
    }),
    prisma.cycleSnapshot.create({
      data: {
        cycleId,
        kinsDistributedLastCycle: distributedUi,
        recipients: paid.length,
        averagePayout: paid.length ? distributedUi / paid.length : 0,
        totalDistributed: previousTotal + distributedUi,
        treasuryBalance: treasurySol,
      },
    }),
    prisma.holderSnapshot.deleteMany(),
    prisma.holderSnapshot.createMany({
      data: holders.slice(0, 100).map((holder, index) => ({
        rank: index + 1,
        wallet: holder.owner,
        balance: holder.balance,
        share: Number((holder.raw * 10_000n) / totalRaw) / 100,
      })),
    }),
  ];

  if (paid.length > 0) {
    operations.splice(
      2,
      0,
      prisma.payout.createMany({
        data: paid.map((payout, index) => ({
          wallet: payout.owner,
          kins: payout.amountUi,
          cycleId,
          signature: transferSignatures[Math.floor(index / workerConfig.transfersPerTx)] ?? null,
          status: "PAID",
        })),
      }),
    );
  }

  if (failed.length > 0) {
    operations.splice(
      3,
      0,
      prisma.payout.createMany({
        data: failed.map((payout) => ({
          wallet: payout.owner,
          kins: payout.amountUi,
          cycleId,
          status: "FAILED",
          errorMessage: payout.reason,
        })),
      }),
    );
  }

  await prisma.$transaction(operations);
}
