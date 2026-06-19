import { TOKEN_PROGRAM_ID, getMint } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { connection, HOLDER_MINT, workerConfig } from "./config";

export type Holder = {
  owner: string;
  balance: number;
  raw: bigint;
};

export async function getDecimals(mint: PublicKey) {
  const mintAccount = await getMint(connection, mint);
  return mintAccount.decimals;
}

export async function snapshotHolders() {
  const decimals = await getDecimals(HOLDER_MINT);
  const minimumRaw = BigInt(Math.floor(workerConfig.minHolderBalance * 10 ** decimals));

  const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
    filters: [
      { dataSize: 165 },
      {
        memcmp: {
          offset: 0,
          bytes: HOLDER_MINT.toBase58(),
        },
      },
    ],
  });

  const balances = new Map<string, bigint>();

  for (const account of accounts) {
    const parsed = account.account.data;
    if (typeof parsed === "string" || !("parsed" in parsed)) {
      continue;
    }

    const info = parsed.parsed.info as {
      owner?: string;
      tokenAmount?: { amount?: string };
    };
    const owner = info.owner;
    const raw = BigInt(info.tokenAmount?.amount ?? "0");

    if (!owner || workerConfig.excludedWallets.has(owner) || raw <= 0n) {
      continue;
    }

    balances.set(owner, (balances.get(owner) ?? 0n) + raw);
  }

  const holders = Array.from(balances.entries())
    .map(([owner, raw]) => ({ owner, raw, balance: Number(raw) / 10 ** decimals }))
    .filter((holder) => holder.raw >= minimumRaw)
    .sort((a, b) => (b.raw > a.raw ? 1 : b.raw < a.raw ? -1 : 0));

  const totalRaw = holders.reduce((sum, holder) => sum + holder.raw, 0n);

  return { holders, totalRaw, decimals };
}
