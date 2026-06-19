import { NextResponse } from "next/server";
import { hasDatabaseUrl, prisma } from "@/lib/db";
import { initialSnapshot } from "@/lib/rewardEngine";

export async function GET() {
  if (!hasDatabaseUrl) {
    return NextResponse.json({ snapshot: initialSnapshot, source: "reward_engine" });
  }

  try {
    const [cycle, holders] = await Promise.all([
      prisma.cycleSnapshot.findFirst({
        orderBy: { cycleId: "desc" },
      }),
      prisma.holderSnapshot.findMany({ orderBy: { rank: "asc" }, take: 50 }),
    ]);

    if (!cycle) {
      return NextResponse.json({ snapshot: initialSnapshot, source: "reward_engine" });
    }

    const payouts = await prisma.payout.findMany({ orderBy: [{ cycleId: "desc" }, { createdAt: "desc" }], take: 30 });

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
        })),
        payouts: payouts.map((payout) => ({
          wallet: payout.wallet,
          kins: Number(payout.kins),
          cycleId: payout.cycleId,
          time: payout.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        })),
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
