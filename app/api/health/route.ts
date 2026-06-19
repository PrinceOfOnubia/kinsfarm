import { NextResponse } from "next/server";
import { hasDatabaseUrl, prisma } from "@/lib/db";

export async function GET() {
  if (!hasDatabaseUrl) {
    return NextResponse.json({ ok: true, database: "not_configured", mode: "reward_engine" });
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, database: "connected" });
  } catch (error) {
    return NextResponse.json(
      { ok: false, database: "error", message: error instanceof Error ? error.message : "Unknown database error" },
      { status: 500 },
    );
  }
}
