import { NextResponse } from "next/server";
import { hasDatabaseUrl, prisma } from "@/lib/db";
import { initialSnapshot } from "@/lib/mockRewards";

export async function GET() {
  if (!hasDatabaseUrl) {
    return NextResponse.json({ snapshot: initialSnapshot, source: "mock" });
  }

  try {
    const [cycle, holders] = await Promise.all([
      prisma.cycleSnapshot.findFirst({
        orderBy: { cycleId: "desc" },
      }),
      prisma.holderSnapshot.findMany({ orderBy: { rank: "asc" }, take: 10 }),
    ]);

    if (!cycle) {
      return NextResponse.json({ snapshot: initialSnapshot, source: "empty_database" });
    }

    const payouts = await prisma.payout.findMany({ orderBy: [{ cycleId: "desc" }, { createdAt: "desc" }], take: 8 });

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
      source: "database_error",
      message: error instanceof Error ? error.message : "Unable to read reward snapshot",
    });
  }
}
