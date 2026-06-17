# $KINSFARM Reward Engine

Pixel MMO-style crypto reward dashboard built with Next.js, Tailwind CSS, and Prisma.

## Local Development

```bash
npm install
npm run db:generate
npm run dev
```

Open `http://localhost:3000/dashboard`.

## Environment

Copy `.env.example` to `.env` when using PostgreSQL:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

The dashboard falls back to mock reward data when `DATABASE_URL` is not configured.

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
