# KINSCLUB Rewards

Pixel MMO-style community rewards platform built with Next.js, Tailwind CSS, and Prisma.

## Local Development

```bash
npm install
npm run db:generate
npm run dev
```

Open `http://localhost:3000/dashboard`.

## Environment

Copy `.env.example` to `.env` when using PostgreSQL and the reward worker:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
TREASURY_SECRET_KEY="[1,2,3,...,64]"
HOLDER_MINT="KINSCLUB_TOKEN_MINT"
REWARD_MINT="KINS_TOKEN_MINT"
DRY_RUN="true"
```

The dashboard uses seeded reward engine data when `DATABASE_URL` is not configured.

`HOLDER_MINT` is the KINSCLUB mint used for eligibility and weight. `REWARD_MINT` is the KINS mint distributed as rewards. `TREASURY_SECRET_KEY` must be a Solana 64-byte private key array only; base58 strings are intentionally rejected.

## Reward Worker

The worker is designed for Railway as a separate service:

```bash
npm run db:migrate
npm run worker
```

Start with `DRY_RUN=true`. After confirming holder snapshots, cycle rows, and dashboard metrics, switch to `DRY_RUN=false` only with production RPC, treasury, and mint values configured.

## Production

```bash
npm run lint
npm run build
npm run db:migrate
npm run db:seed
```

The API routes are:

- `/api/health`
- `/api/rewards`
