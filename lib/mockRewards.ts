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
  "Bt6Realm44Eko",
  "Cp9Guild72Qor",
  "Qn4Season9Tav",
  "M8xHolder1Vae",
  "4FarmRune8Lq",
  "Tavern6B1nkS",
  "J9KintaraMx7",
  "PayoutSage11",
  "8ClanVaultQa",
  "3QuestBoardLp",
  "RwdEngine66",
  "Y7FarmhandZp",
  "NobleKin45S",
  "L2TreasuryVx",
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
    const balances = [
      5250000, 4120000, 3750000, 3250000, 2980000, 2420000, 2145000, 1820000, 1555000, 1315000, 1180000, 1095000,
      980000, 875000, 821000, 760000, 702500, 665000, 608000, 552500, 501000, 455000, 392000, 318000,
    ];
    const shares = [
      8.52, 6.69, 6.09, 5.27, 4.83, 3.93, 3.48, 2.95, 2.52, 2.13, 1.91, 1.78, 1.59, 1.42, 1.33, 1.23, 1.14, 1.08,
      0.99, 0.9, 0.81, 0.74, 0.64, 0.52,
    ];
    return {
      rank: index + 1,
      wallet,
      balance: balances[index],
      share: shares[index],
    };
  }),
  payouts: Array.from({ length: 24 }).map((_, index) => ({
    wallet: wallets[index % wallets.length],
    kins: [125.34, 98.75, 156.22, 73.11, 188.9, 111.42, 142.77, 86.31, 205.12, 64.45, 134.88, 99.02][index % 12],
    cycleId: 18432 - index,
    time: ["11:20 AM", "11:10 AM", "11:00 AM", "10:50 AM", "10:40 AM", "10:30 AM", "10:20 AM", "10:10 AM"][index % 8],
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
    ].slice(0, 30),
  };
}
