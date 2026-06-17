CREATE TABLE "CycleSnapshot" (
    "id" TEXT NOT NULL,
    "cycleId" INTEGER NOT NULL,
    "kinsDistributedLastCycle" DECIMAL(18,4) NOT NULL,
    "recipients" INTEGER NOT NULL,
    "averagePayout" DECIMAL(18,4) NOT NULL,
    "totalDistributed" DECIMAL(22,4) NOT NULL,
    "treasuryBalance" DECIMAL(22,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CycleSnapshot_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Payout" (
    "id" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "kins" DECIMAL(18,4) NOT NULL,
    "cycleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HolderSnapshot" (
    "id" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "wallet" TEXT NOT NULL,
    "balance" DECIMAL(22,4) NOT NULL,
    "share" DECIMAL(8,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HolderSnapshot_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CycleSnapshot_cycleId_key" ON "CycleSnapshot"("cycleId");
CREATE INDEX "Payout_cycleId_idx" ON "Payout"("cycleId");
CREATE INDEX "Payout_wallet_idx" ON "Payout"("wallet");
CREATE INDEX "HolderSnapshot_rank_idx" ON "HolderSnapshot"("rank");
CREATE INDEX "HolderSnapshot_wallet_idx" ON "HolderSnapshot"("wallet");
