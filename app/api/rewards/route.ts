import { NextResponse } from "next/server";
import { hasDatabaseUrl, prisma } from "@/lib/db";
import { initialSnapshot } from "@/lib/rewardEngine";

export async function GET() {
  if (!hasDatabaseUrl) {
    return NextResponse.json({ snapshot: initialSnapshot, source: "reward_engine" });
  }

  try {
    const [cycle, holders, worker, holderRewards] = await Promise.all([
      prisma.cycleSnapshot.findFirst({
        orderBy: { cycleId: "desc" },
      }),
      prisma.holderSnapshot.findMany({ orderBy: { rank: "asc" }, take: 50 }),
      prisma.rewardCycleRun.findFirst({ orderBy: { startedAt: "desc" } }),
      prisma.payout.groupBy({
        by: ["wallet"],
        where: { status: "PAID" },
        _sum: { kins: true },
      }),
    ]);

    if (!cycle) {
      return NextResponse.json({ snapshot: initialSnapshot, source: "reward_engine" });
    }

    const payouts = await prisma.payout.findMany({ orderBy: [{ cycleId: "desc" }, { createdAt: "desc" }], take: 30 });
    const rewardsByWallet = new Map(holderRewards.map((reward) => [reward.wallet, Number(reward._sum.kins ?? 0)]));

    return NextResponse.json({
      source: "database",
      snapshot: {
        cycleId: cycle.cycleId,
        kinsDistributedLastCycle: Number(cycle.kinsDistributedLastCycle),
        recipients: cycle.recipients,
        averagePayout: Number(cycle.averagePayout),
        totalDistributed: Number(cycle.totalDistributed),
        treasuryBalance: Number(cycle.treasuryBalance),
        holders: holders.map((holder) => ({
          rank: holder.rank,
          wallet: holder.wallet,
          balance: Number(holder.balance),
          share: Number(holder.share),
          rewardsEarned: rewardsByWallet.get(holder.wallet) ?? 0,
        })),
        payouts: payouts.map((payout) => ({
          wallet: payout.wallet,
          kins: Number(payout.kins),
          cycleId: payout.cycleId,
          time: payout.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        })),
        worker: worker
          ? {
              cycleId: worker.cycleId,
              status: worker.status,
              dryRun: worker.dryRun,
              startedAt: worker.startedAt.toISOString(),
              completedAt: worker.completedAt?.toISOString() ?? null,
              claimSignature: worker.claimSignature,
              buySignature: worker.buySignature,
              transferCount: worker.transferSignatures.length,
              errorMessage: worker.errorMessage,
            }
          : undefined,
      },
    });
  } catch (error) {
    return NextResponse.json({
      snapshot: initialSnapshot,
      source: "reward_engine",
      message: error instanceof Error ? error.message : "Unable to read reward snapshot",
    });
  }
}
