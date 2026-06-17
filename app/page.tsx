import Link from "next/link";
import { CopyContract } from "@/components/CopyContract";
import { MobileMenu } from "@/components/MobileMenu";
import { PixelButton } from "@/components/PixelButton";
import { WalletConnect } from "@/components/WalletConnect";
import { XIcon } from "@/components/XIcon";

const pillars = [
  ["Reward Engine", "Hold $KINSFARM and track the cycle engine as KINS rewards move through the ecosystem."],
  ["Community Bank", "A game-like treasury dashboard for holders, top farmers, payout history, and future clan rewards."],
  ["Kintara Layer", "Styled to feel at home beside KINSMEN and Kintara: quests, holders, teams, and seasonal energy."],
];

export default function Home() {
  return (
    <main className="pixel-screen min-h-screen px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5">
        <header className="kins-header pixel-corners flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="coin grid h-12 w-12 shrink-0 place-items-center pixel-font">$</span>
            <div className="min-w-0">
              <p className="pixel-title truncate text-3xl font-black">$KINSFARM</p>
              <p className="pixel-label text-white/85">Hold - Earn KINS</p>
            </div>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/dashboard" className="hidden pixel-corners border border-white/35 bg-white/15 px-3 py-2 pixel-label text-white transition hover:bg-gold hover:text-[#52320b] md:inline-flex">
              Dashboard
            </Link>
            <a
              href="https://x.com/kinsmenonsol"
              target="_blank"
              rel="noreferrer"
              aria-label="$KINSFARM on X"
              className="hidden h-11 w-11 place-items-center rounded-2xl border border-white/35 bg-white/15 text-white transition hover:bg-gold hover:text-[#52320b] md:grid"
            >
              <XIcon />
            </a>
            <div className="hidden sm:block">
              <WalletConnect />
            </div>
            <MobileMenu />
          </div>
        </header>

        <section className="community-hero pixel-corners relative min-h-[calc(100vh-132px)] overflow-hidden border border-white/35 px-4 py-10 shadow-panel sm:px-8 lg:px-12">
          <div className="relative z-10 flex min-h-[72vh] max-w-3xl flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/25 px-4 py-2 font-black text-white backdrop-blur">
              <span className="h-3 w-3 rounded-full bg-gold" />
              Community reward engine warming up
            </div>
            <h1 className="pixel-title text-5xl font-black leading-none sm:text-7xl lg:text-8xl">$KINSFARM</h1>
            <p className="mt-5 max-w-2xl text-xl font-black text-white drop-shadow">
              A pixel MMO banking layer for KINS holders, farmers, and the wider Kintara community.
            </p>
            <p className="mt-3 max-w-2xl text-base font-semibold text-white/90 drop-shadow">
              Track cycles, holders, payouts, treasury health, and the reward economy before quests, clans, and governance arrive.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PixelButton href="/dashboard">Enter Dashboard</PixelButton>
              <PixelButton href="#ecosystem" variant="secondary">View Ecosystem</PixelButton>
            </div>
            <div className="mt-6 max-w-xl">
              <CopyContract />
            </div>
          </div>
        </section>

        <section id="ecosystem" className="grid gap-4 lg:grid-cols-3">
          {pillars.map(([title, copy]) => (
            <article key={title} className="hud-window pixel-corners p-5">
              <p className="pixel-label text-gold">{title}</p>
              <p className="mt-3 text-sm font-bold leading-6 text-white/78">{copy}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
