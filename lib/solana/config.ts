import { Connection, Keypair, PublicKey } from "@solana/web3.js";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

function optionalNumber(name: string, fallback: number) {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${name} must be a number`);
  }
  return parsed;
}

function optionalBoolean(name: string, fallback: boolean) {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function parsePrivateKey(value: string) {
  const trimmed = value.trim();

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!Array.isArray(parsed) || parsed.length !== 64 || !parsed.every((item) => Number.isInteger(item) && item >= 0 && item <= 255)) {
      throw new Error("invalid array");
    }
    return Uint8Array.from(parsed);
  } catch {
    throw new Error("TREASURY_SECRET_KEY must be a Solana private key byte array, for example [1,2,...,64]");
  }
}

export const connection = new Connection(requiredEnv("SOLANA_RPC_URL"), "confirmed");

export const HOLDER_MINT = new PublicKey(requiredEnv("HOLDER_MINT"));
export const REWARD_MINT = new PublicKey(requiredEnv("REWARD_MINT"));

export const PUMPPORTAL_API_KEY = process.env.PUMPPORTAL_API_KEY ?? "";

export const workerConfig = {
  cycleDurationSeconds: optionalNumber("WORKER_CYCLE_SECONDS", 600),
  minClaimSol: optionalNumber("MIN_CLAIM_SOL", 0.02),
  reserveSol: optionalNumber("RESERVE_SOL", 0.03),
  buySlippage: optionalNumber("BUY_SLIPPAGE", 12),
  priorityFee: optionalNumber("PRIORITY_FEE", 0.00008),
  minHolderBalance: optionalNumber("MIN_HOLDER_BALANCE", 500_000),
  transfersPerTx: Math.max(1, Math.floor(optionalNumber("TRANSFERS_PER_TX", 8))),
  dryRun: optionalBoolean("DRY_RUN", true),
  excludedWallets: new Set(
    (process.env.EXCLUDED_WALLETS ?? "")
      .split(",")
      .map((wallet) => wallet.trim())
      .filter(Boolean),
  ),
};

export function loadTreasury() {
  return Keypair.fromSecretKey(parsePrivateKey(requiredEnv("TREASURY_SECRET_KEY")));
}
