import Link from "next/link";
import { CopyContract } from "@/components/CopyContract";
import { MobileMenu } from "@/components/MobileMenu";
import { PixelButton } from "@/components/PixelButton";
import { WalletConnect } from "@/components/WalletConnect";
import { XIcon } from "@/components/XIcon";

const features = [
  ["Hold to Earn", "Hold 500,000 KINSCLUB and become eligible for recurring KINS reward distributions and Kintara Club membership raffle while remaining an active community member."],
  ["Win Memberships", "Eligible holders are automatically entered into recurring raffles for Kintara Club memberships and additional ecosystem rewards."],
  ["Play & Earn", "Compete in browser-based games, complete challenges, and climb the leaderboard to earn extra KINS and exclusive rewards."],
  ["Community Rewards", "Participate in seasonal campaigns, community events, referrals, and quests designed to reward long-term supporters."],
];

const steps = [
  ["1. Hold KINSCLUB", "Acquire and hold KINSCLUB to unlock eligibility."],
  ["2. Stay Active", "Play games, complete quests, and participate in community activities."],
  ["3. Earn KINS", "Receive KINS rewards through distributions and performance-based incentives."],
  ["4. Win Exclusive Rewards", "Qualify for recurring raffles, memberships, and special community giveaways."],
];

const rewards = [
  "KINS reward distributions",
  "Kintara Club membership giveaways",
  "Browser game rewards",
  "Seasonal campaign prizes",
  "Exclusive community raffles",
  "Future ecosystem incentives",
];

export default function Home() {
  return (
    <main className="pixel-screen min-h-screen px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5">
        <header className="kins-header pixel-corners flex flex-row items-center justify-between gap-3 p-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="coin grid h-12 w-12 shrink-0 place-items-center pixel-font">$</span>
            <div className="min-w-0">
              <p className="pixel-title truncate text-3xl font-black">KINSCLUB</p>
              <p className="pixel-label text-white/85">Hold - Earn KINS</p>
            </div>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <Link href="/dashboard" className="hidden pixel-corners border border-white/35 bg-white/15 px-3 py-2 pixel-label text-white transition hover:bg-gold hover:text-[#52320b] md:inline-flex">
              Dashboard
            </Link>
            <a
              href="https://x.com/kinsmenonsol"
              target="_blank"
              rel="noreferrer"
              aria-label="KINSCLUB on X"
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/35 bg-[#315d84] text-white transition hover:bg-gold hover:text-[#52320b]"
            >
              <XIcon />
            </a>
            <div className="hidden md:block">
              <WalletConnect />
            </div>
            <MobileMenu />
          </div>
        </header>

        <section className="community-hero pixel-corners relative min-h-[calc(100vh-132px)] overflow-hidden border border-white/35 px-4 py-10 shadow-panel sm:px-8 lg:px-12">
          <div className="relative z-10 flex min-h-[72vh] max-w-4xl flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#315d84] px-4 py-2 font-black text-white shadow-panel">
              <span className="h-3 w-3 rounded-full bg-gold" />
              CLUB OF KINTARA
            </div>
            <h1 className="pixel-title text-4xl font-black leading-none sm:text-6xl lg:text-7xl">Hold KINSCLUB. Earn KINS rewards. Win memberships.</h1>
            <p className="mt-5 max-w-2xl text-xl font-black text-white drop-shadow">
              Join the community built for Kintara players and supporters.
            </p>
            <p className="mt-3 max-w-3xl text-base font-semibold text-white/90 drop-shadow">
              Hold KINSCLUB to become eligible for KINS reward distributions, exclusive raffles, browser game rewards, and giveaways including Kintara Club memberships and other community prizes.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PixelButton href="/dashboard">Get Started</PixelButton>
              <PixelButton href="/dashboard" variant="secondary">View Leaderboard</PixelButton>
            </div>
            <div className="mt-6 max-w-xl">
              <CopyContract />
            </div>
          </div>
        </section>

        <section id="ecosystem" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map(([title, copy]) => (
            <article key={title} className="hud-window pixel-corners p-5">
              <p className="pixel-label text-gold">{title}</p>
              <p className="mt-3 text-sm font-bold leading-6 text-white/78">{copy}</p>
            </article>
          ))}
        </section>

        <section className="hud-window pixel-corners p-5 sm:p-6">
          <div className="mb-5">
            <p className="pixel-label text-gold">How It Works</p>
            <h2 className="pixel-title mt-2 text-3xl font-black">Hold. Play. Earn. Win.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {steps.map(([title, copy]) => (
              <div key={title} className="pixel-stat pixel-corners p-4">
                <p className="pixel-label text-gold">{title}</p>
                <p className="mt-3 text-sm font-bold leading-6 text-white/75">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="hud-window pixel-corners p-5 sm:p-6">
            <p className="pixel-label text-gold">Leaderboard</p>
            <h2 className="pixel-title mt-2 text-3xl font-black">Compete. Climb. Earn.</h2>
            <p className="mt-4 text-lg font-black text-white">Your activity matters.</p>
            <p className="mt-3 text-sm font-bold leading-6 text-white/78">
              Complete quests, play games, and stay engaged to improve your position on the leaderboard and unlock additional rewards.
            </p>
            <div className="mt-5">
              <PixelButton href="/dashboard" variant="secondary">View Leaderboard</PixelButton>
            </div>
          </article>

          <article className="hud-window pixel-corners p-5 sm:p-6">
            <p className="pixel-label text-gold">Rewards</p>
            <h2 className="pixel-title mt-2 text-3xl font-black">Rewards Designed for Loyal Holders</h2>
            <p className="mt-4 text-sm font-bold text-white/78">KINSCLUB holders can become eligible for:</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {rewards.map((reward) => (
                <div key={reward} className="inventory-row pixel-corners px-3 py-2 pixel-label text-white/80">
                  {reward}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="hud-window pixel-corners p-5 sm:p-6">
          <p className="pixel-label text-gold">About</p>
          <h2 className="pixel-title mt-2 text-3xl font-black">What is KINSCLUB?</h2>
          <p className="mt-4 max-w-4xl text-sm font-bold leading-6 text-white/78">
            KINSCLUB is an independent community rewards platform created for Kintara players and supporters.
          </p>
          <p className="mt-3 max-w-4xl text-sm font-bold leading-6 text-white/78">
            By holding KINSCLUB and participating in community activities, members can earn KINS rewards and become eligible for exclusive giveaways and seasonal incentives.
          </p>
        </section>
      </div>
    </main>
  );
}
