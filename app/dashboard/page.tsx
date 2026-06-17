"use client";

import { useEffect, useMemo, useState } from "react";
import { Panel } from "@/components/Panel";
import { PixelButton } from "@/components/PixelButton";
import { PixelProgress } from "@/components/PixelProgress";
import { Sparkline } from "@/components/Sparkline";
import { StatCard } from "@/components/StatCard";
import {
  advanceSnapshot,
  type CycleSnapshot,
  cycleDurationSeconds,
  formatNumber,
  formatTimer,
  initialSnapshot,
  minimumRequirement,
  truncateWallet,
} from "@/lib/mockRewards";

const playerBalance = 250_000;
const walletAddress = "7xQhJ2p9z3Fabb";
const sparklinePoints = [22, 26, 25, 31, 29, 36, 33, 39, 48, 46, 52, 56, 66, 64, 71, 69, 78, 96];

export default function DashboardPage() {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [dataSource, setDataSource] = useState("mock");
  const [loadingSnapshot, setLoadingSnapshot] = useState(true);
  const [snapshotError, setSnapshotError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(272);
  const [connected, setConnected] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadSnapshot() {
      try {
        const response = await fetch("/api/rewards", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Reward API returned ${response.status}`);
        }
        const payload = (await response.json()) as { snapshot: CycleSnapshot; source: string; message?: string };
        if (!active) {
          return;
        }
        setSnapshot(payload.snapshot);
        setDataSource(payload.source);
        setSnapshotError(payload.message ?? "");
      } catch (error) {
        if (active) {
          setSnapshotError(error instanceof Error ? error.message : "Unable to load reward data");
        }
      } finally {
        if (active) {
          setLoadingSnapshot(false);
        }
      }
    }

    loadSnapshot();
    const refresh = window.setInterval(loadSnapshot, 10000);

    return () => {
      active = false;
      window.clearInterval(refresh);
    };
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setSnapshot((snapshotValue) => advanceSnapshot(snapshotValue));
          setPulse(true);
          window.setTimeout(() => setPulse(false), 900);
          return cycleDurationSeconds;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(tick);
  }, []);

  const cycleProgress = useMemo(() => ((cycleDurationSeconds - secondsLeft) / cycleDurationSeconds) * 100, [secondsLeft]);
  const eligible = playerBalance >= minimumRequirement;
  const requirementProgress = Math.min(250, (playerBalance / minimumRequirement) * 100);
  const treasuryHealth = Math.min(100, Math.max(34, (snapshot.treasuryBalance / 1_500_000) * 100));
  const estimatedPayout = (playerBalance / 1_000_000) * snapshot.averagePayout * 9.25;

  return (
    <main className="pixel-screen min-h-screen px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4">
        <header className="hud-window pixel-corners flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center border-2 border-gold bg-black/25 shadow-rune">
              <div className="coin grid h-9 w-9 place-items-center pixel-font text-sm">$</div>
            </div>
            <div className="min-w-0">
              <h1 className="pixel-title truncate text-3xl font-black sm:text-4xl">$KINSFARM</h1>
              <p className="pixel-label text-skyGame">Hold - Earn KINS</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-3 lg:justify-center">
            <div className="pixel-corners border border-grass/40 bg-black/30 px-4 py-3">
              <p className="pixel-label text-grass"><span className="mr-2 inline-block h-3 w-3 bg-grass shadow-[0_0_12px_#5ed052]" />SYSTEM ACTIVE</p>
            </div>
            <div className={`pixel-corners border border-gold/40 bg-black/30 px-4 py-3 ${pulse ? "shadow-rune" : ""}`}>
              <p className="pixel-label text-white/70">Cycle closes in <span className="text-gold">{formatTimer(secondsLeft)}</span></p>
            </div>
            <div className="pixel-corners border border-skyGame/30 bg-black/30 px-4 py-3">
              <p className="pixel-label text-white/45">{loadingSnapshot ? "Loading realm data" : `Data: ${dataSource}`}</p>
            </div>
            {snapshotError ? (
              <div className="pixel-corners border border-orangeCta/40 bg-orangeCta/10 px-4 py-3">
                <p className="pixel-label text-orangeCta">Fallback active</p>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:justify-end">
            {connected ? (
              <div className="pixel-corners border border-skyGame/40 bg-black/30 px-4 py-3">
                <p className="pixel-label text-white/60">Wallet</p>
                <p className="pixel-font text-skyGame">{truncateWallet(walletAddress)}</p>
              </div>
            ) : null}
            <PixelButton variant="green" onClick={() => setConnected((value) => !value)}>
              {connected ? "Disconnect" : "Connect Wallet"}
            </PixelButton>
          </div>
        </header>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4">
            <section className="grid gap-4 lg:grid-cols-3">
              <Panel title="Next Distribution Cycle" icon="⟳">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative mx-auto grid h-40 w-40 shrink-0 place-items-center border-4 border-grass bg-black/30 shadow-[0_0_30px_rgba(94,208,82,0.24)]">
                    <div className="absolute inset-3 border-2 border-gold/40" />
                    <div className="text-center">
                      <p className="pixel-font text-4xl text-white">{formatTimer(secondsLeft)}</p>
                      <p className="pixel-label text-white/55">MIN : SEC</p>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between gap-3">
                        <span className="pixel-label text-white/60">Cycle Progress</span>
                        <span className="pixel-label text-grass">{Math.round(cycleProgress)}%</span>
                      </div>
                      <PixelProgress value={cycleProgress} />
                    </div>
                    <div className="pixel-stat pixel-corners p-3">
                      <p className="pixel-label text-white/60">Cycle Duration</p>
                      <p className="pixel-font text-lg text-gold">10 Minutes</p>
                    </div>
                    <p className="pixel-label animate-pulse text-grass">Next KINS payout incoming</p>
                  </div>
                </div>
              </Panel>

              <Panel title="Last Cycle Metrics" icon="▣">
                <div className="space-y-3">
                  <StatCard icon="●" label="KINS Distributed" value={formatNumber(snapshot.kinsDistributedLastCycle, 4)} tone="green" />
                  <StatCard icon="◆" label="Recipients" value={formatNumber(snapshot.recipients)} tone="sky" />
                  <StatCard icon="▲" label="Average Payout" value={`${formatNumber(snapshot.averagePayout, 2)} KINS`} tone="gold" />
                </div>
                <div className="mt-4 flex justify-between gap-3 pixel-label text-white/45">
                  <span>Last Cycle</span>
                  <span>Cycle #{snapshot.cycleId}</span>
                </div>
              </Panel>

              <Panel title="Total KINS Distributed" icon="◎">
                <div className="flex items-start gap-3">
                  <div className="coin grid h-12 w-12 shrink-0 place-items-center pixel-font">K</div>
                  <div className="min-w-0">
                    <p className={`pixel-font break-words text-2xl leading-tight text-grass min-[1400px]:text-4xl ${pulse ? "scale-[1.02]" : ""} transition`}>
                      {formatNumber(snapshot.totalDistributed, 4)}
                    </p>
                    <p className="pixel-label text-white/55">All time distributed to holders</p>
                  </div>
                </div>
                <div className="mt-4 border border-grass/20 bg-black/25 p-2">
                  <Sparkline points={sparklinePoints.map((point, index) => point + (pulse && index > 14 ? 8 : 0))} />
                </div>
              </Panel>
            </section>

            <section className="grid gap-4 lg:grid-cols-3">
              <Panel title="Your Status" icon="☻">
                <div className="space-y-3">
                  <StatusLine label="KINSFARM Balance" value={formatNumber(playerBalance)} />
                  <StatusLine label="Your Weight" value="500.00" />
                  <StatusLine label="Est. Next Payout" value={`${formatNumber(estimatedPayout, 2)} KINS`} />
                  <div className={`pixel-corners border p-3 ${eligible ? "border-grass/50 bg-grass/10" : "border-red-500/50 bg-red-500/10"}`}>
                    <p className={`pixel-label ${eligible ? "text-grass" : "text-red-400"}`}>{eligible ? "ELIGIBLE" : "NOT ELIGIBLE"}</p>
                    <p className="text-sm text-white/60">{eligible ? "You are earning rewards" : "Add more KINSFARM to qualify"}</p>
                  </div>
                </div>
              </Panel>

              <Panel title="System Status" icon="✚">
                <div className="pixel-corners mb-4 border border-grass/45 bg-grass/10 p-4">
                  <p className="pixel-font text-2xl text-grass">● ACTIVE</p>
                  <p className="text-sm text-white/60">All reward engine channels operational</p>
                </div>
                <div className="space-y-3">
                  <StatusLine label="Treasury Balance" value={`${formatNumber(snapshot.treasuryBalance, 2)} KINS`} />
                  <StatusLine label="Next Cycle Timer" value={formatTimer(secondsLeft)} />
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="pixel-label text-white/60">Treasury HP</span>
                      <span className="pixel-label text-grass">{Math.round(treasuryHealth)}%</span>
                    </div>
                    <PixelProgress value={treasuryHealth} blocks={18} tone="gold" />
                  </div>
                </div>
              </Panel>

              <Panel title="Minimum Requirement" icon="☆">
                <div className="pixel-stat pixel-corners p-4">
                  <div className="mb-4 flex justify-between gap-3">
                    <div>
                      <p className="pixel-label text-white/60">Required</p>
                      <p className="pixel-font text-lg text-white">{formatNumber(minimumRequirement)} KINSFARM</p>
                    </div>
                    <div className="text-right">
                      <p className="pixel-label text-white/60">Your Progress</p>
                      <p className="pixel-font text-2xl text-grass">{Math.round(requirementProgress)}%</p>
                    </div>
                  </div>
                  <PixelProgress value={Math.min(requirementProgress, 100)} />
                </div>
                <div className={`pixel-corners mt-4 border p-3 ${eligible ? "border-grass/50 bg-grass/10" : "border-red-500/50 bg-red-500/10"}`}>
                  <p className={`pixel-label ${eligible ? "text-grass" : "text-red-400"}`}>{eligible ? "Eligible" : "Not Eligible"}</p>
                  <p className="text-sm text-white/60">{eligible ? "You meet the minimum requirement" : "Requirement not yet met"}</p>
                </div>
              </Panel>
            </section>

            <Panel title="Recent Payout History" icon="▤">
              <div className="hidden grid-cols-[1.2fr_1fr_0.8fr_0.9fr] gap-2 border-b border-gold/20 px-3 pb-2 pixel-label text-white/45 sm:grid">
                <span>Wallet</span>
                <span>KINS Received</span>
                <span>Cycle ID</span>
                <span>Time</span>
              </div>
              <div className="mt-2 space-y-2">
                {snapshot.payouts.map((row) => (
                  <div key={`${row.cycleId}-${row.wallet}-${row.kins}`} className="inventory-row pixel-corners grid gap-2 p-3 text-sm sm:grid-cols-[1.2fr_1fr_0.8fr_0.9fr]">
                    <span className="pixel-font text-skyGame">{truncateWallet(row.wallet)}</span>
                    <span><span className="coin mr-2 inline-grid h-5 w-5 place-items-center text-[10px]">K</span>{formatNumber(row.kins, 2)}</span>
                    <span className="text-white/70">#{row.cycleId}</span>
                    <span className="text-white/70">{row.time}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <aside className="hud-window pixel-corners h-fit p-4 xl:sticky xl:top-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="pixel-label text-gold">Top Holders</h2>
              <span className="pixel-corners border border-gold/30 bg-black/25 px-2 py-1 pixel-label text-white/45">1-10</span>
            </div>
            <div className="space-y-2">
              {snapshot.holders.map((holder) => (
                <div key={holder.wallet} className="inventory-row pixel-corners grid grid-cols-[2.2rem_1fr] gap-2 p-3">
                  <span className="pixel-font text-gold">{holder.rank <= 3 ? "♛" : `#${holder.rank}`}</span>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="pixel-font truncate text-skyGame">{truncateWallet(holder.wallet)}</span>
                      <span className="pixel-label text-grass">{holder.share.toFixed(2)}%</span>
                    </div>
                    <p className="truncate text-sm text-white/60">{formatNumber(holder.balance)} KINSFARM</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
      <span className="pixel-label text-white/55">{label}</span>
      <span className="pixel-font text-right text-white">{value}</span>
    </div>
  );
}
