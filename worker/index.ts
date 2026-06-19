async function main() {
  if (process.env.WORKER_ENABLED !== "true") {
    console.log("KINSCLUB reward worker is installed but disabled. Set WORKER_ENABLED=true after configuring live env vars.");
    setInterval(() => undefined, 60 * 60 * 1000);
    return;
  }

  const { runCycle } = await import("./cycle");
  const { workerConfig } = await import("../lib/solana/config");

  let running = false;

  async function tick() {
    if (running) {
      console.log("previous cycle still running; skipping tick");
      return;
    }

    running = false;
    try {
      running = true;
      await runCycle();
    } catch (error) {
      console.error("reward cycle failed", error);
    } finally {
      running = false;
    }
  }

  console.log(`KINSCLUB reward worker started (${workerConfig.dryRun ? "dry-run" : "live"} mode)`);
  void tick();
  setInterval(tick, workerConfig.cycleDurationSeconds * 1000);
}

void main();
