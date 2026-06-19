ALTER TABLE "Payout" ADD COLUMN "signature" TEXT;
ALTER TABLE "Payout" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'PAID';
ALTER TABLE "Payout" ADD COLUMN "errorMessage" TEXT;

CREATE INDEX "Payout_status_idx" ON "Payout"("status");

CREATE TABLE "RewardCycleRun" (
    "id" TEXT NOT NULL,
    "cycleId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "dryRun" BOOLEAN NOT NULL DEFAULT true,
    "claimSignature" TEXT,
    "buySignature" TEXT,
    "transferSignatures" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "treasurySol" DECIMAL(22,8),
    "kinsDistributed" DECIMAL(22,4),
    "recipients" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "RewardCycleRun_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "RewardCycleRun_cycleId_idx" ON "RewardCycleRun"("cycleId");
CREATE INDEX "RewardCycleRun_status_idx" ON "RewardCycleRun"("status");
CREATE INDEX "RewardCycleRun_startedAt_idx" ON "RewardCycleRun"("startedAt");
