import { PrismaClient } from "@prisma/client";
import { initialSnapshot } from "../lib/rewardEngine";

const prisma = new PrismaClient();

async function main() {
  await prisma.cycleSnapshot.upsert({
    where: { cycleId: initialSnapshot.cycleId },
    update: {
      kinsDistributedLastCycle: initialSnapshot.kinsDistributedLastCycle,
      recipients: initialSnapshot.recipients,
      averagePayout: initialSnapshot.averagePayout,
      totalDistributed: initialSnapshot.totalDistributed,
      treasuryBalance: initialSnapshot.treasuryBalance,
    },
    create: {
      cycleId: initialSnapshot.cycleId,
      kinsDistributedLastCycle: initialSnapshot.kinsDistributedLastCycle,
      recipients: initialSnapshot.recipients,
      averagePayout: initialSnapshot.averagePayout,
      totalDistributed: initialSnapshot.totalDistributed,
      treasuryBalance: initialSnapshot.treasuryBalance,
    },
  });

  await prisma.payout.deleteMany();
  await prisma.payout.createMany({
    data: initialSnapshot.payouts.map((payout) => ({
      wallet: payout.wallet,
      kins: payout.kins,
      cycleId: payout.cycleId,
    })),
  });

  await prisma.holderSnapshot.deleteMany();
  await prisma.holderSnapshot.createMany({
    data: initialSnapshot.holders.map((holder) => ({
      rank: holder.rank,
      wallet: holder.wallet,
      balance: holder.balance,
      share: holder.share,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
