export type PayoutRow = {
  wallet: string;
  kins: number;
  cycleId: number;
  time: string;
};

export type HolderRow = {
  rank: number;
  wallet: string;
  balance: number;
  share: number;
};

export type CycleSnapshot = {
  cycleId: number;
  kinsDistributedLastCycle: number;
  recipients: number;
  averagePayout: number;
  totalDistributed: number;
  treasuryBalance: number;
  holders: HolderRow[];
  payouts: PayoutRow[];
};

const wallets = [
  "7xQhJ2p9z3Fabb",
  "9mRp6A2sXX9de",
  "3kLzV8mQ77Ghj",
  "8pTvH91F82nk",
  "5vMzC4kLL8op",
  "2rNvP6x9sFae",
  "Hc42Rfq3Kins",
  "Am9xPq441Xpz",
  "K1n5Farm8aQw",
  "D7uPayout3Mz",
];

export const cycleDurationSeconds = 600;
export const minimumRequirement = 100_000;

export const initialSnapshot: CycleSnapshot = {
  cycleId: 18432,
  kinsDistributedLastCycle: 71536.2478,
  recipients: 1318,
  averagePayout: 54.28,
  totalDistributed: 66285714.2235,
  treasuryBalance: 1245732.89,
  holders: wallets.map((wallet, index) => {
    const balances = [5250000, 4120000, 3750000, 3250000, 2980000, 2420000, 2145000, 1820000, 1555000, 1315000];
    const shares = [8.52, 6.69, 6.09, 5.27, 4.83, 3.93, 3.48, 2.95, 2.52, 2.13];
    return {
      rank: index + 1,
      wallet,
      balance: balances[index],
      share: shares[index],
    };
  }),
  payouts: wallets.slice(0, 6).map((wallet, index) => ({
    wallet,
    kins: [125.34, 98.75, 156.22, 73.11, 188.9, 111.42][index],
    cycleId: 18432 - index,
    time: ["11:20 AM", "11:10 AM", "11:00 AM", "10:50 AM", "10:40 AM", "10:30 AM"][index],
  })),
};

export function truncateWallet(wallet: string) {
  return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
}

export function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function advanceSnapshot(snapshot: CycleSnapshot, now = new Date()): CycleSnapshot {
  const variance = 0.94 + Math.random() * 0.14;
  const distributed = snapshot.kinsDistributedLastCycle * variance;
  const recipients = Math.max(1000, snapshot.recipients + Math.floor(Math.random() * 41) - 20);
  const cycleId = snapshot.cycleId + 1;
  const payout = Number((80 + Math.random() * 150).toFixed(2));
  const wallet = wallets[Math.floor(Math.random() * wallets.length)];

  return {
    ...snapshot,
    cycleId,
    kinsDistributedLastCycle: distributed,
    recipients,
    averagePayout: distributed / recipients,
    totalDistributed: snapshot.totalDistributed + distributed,
    treasuryBalance: snapshot.treasuryBalance + 21000 - distributed * 0.18,
    payouts: [
      {
        wallet,
        kins: payout,
        cycleId,
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      ...snapshot.payouts,
    ].slice(0, 8),
  };
}
