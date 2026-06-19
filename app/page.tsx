import Link from "next/link";
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
  "Ecosystem incentives",
];

const leaderboard = [
  ["7xQh...F3ab", "5,250,000", "8.52%", "12,450 KINS"],
  ["9mRp...X9de", "4,120,000", "6.69%", "Membership won"],
  ["3kLz...7Ghj", "3,750,000", "6.09%", "8,940 KINS"],
  ["8pTv...B2nk", "3,250,000", "5.27%", "Raffle active"],
  ["5vMz...L8op", "2,980,000", "4.83%", "6,310 KINS"],
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
            <nav className="hidden items-center gap-2 lg:flex">
              <Link href="#how-it-works" className="pixel-corners border border-white/25 bg-white/10 px-3 py-2 pixel-label text-white transition hover:bg-gold hover:text-[#52320b]">How It Works</Link>
              <Link href="#rewards" className="pixel-corners border border-white/25 bg-white/10 px-3 py-2 pixel-label text-white transition hover:bg-gold hover:text-[#52320b]">Rewards</Link>
              <Link href="#leaderboard" className="pixel-corners border border-white/25 bg-white/10 px-3 py-2 pixel-label text-white transition hover:bg-gold hover:text-[#52320b]">Leaderboard</Link>
              <Link href="#about" className="pixel-corners border border-white/25 bg-white/10 px-3 py-2 pixel-label text-white transition hover:bg-gold hover:text-[#52320b]">About</Link>
            </nav>
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
          <div className="relative z-10 flex min-h-[72vh] max-w-5xl flex-col justify-center">
            <h1 className="pixel-title text-5xl font-black uppercase leading-none sm:text-7xl lg:text-9xl">CLUB OF KINTARA</h1>
            <p className="mt-5 max-w-4xl text-2xl font-black uppercase leading-tight text-white drop-shadow sm:text-3xl">
              HOLD KINSCLUB. EARN KINS REWARDS. WIN MEMBERSHIPS.
            </p>
            <p className="mt-4 max-w-2xl text-lg font-bold text-white/90 drop-shadow">
              A premium community rewards platform for Kintara players and supporters.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PixelButton href="/dashboard">Get Started</PixelButton>
              <PixelButton href="/dashboard" variant="secondary">Enter Dashboard</PixelButton>
            </div>
          </div>
        </section>

        <section id="ecosystem" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map(([title, copy]) => (
            <article key={title} className="hud-window pixel-corners p-5">
              <p className="pixel-label text-base text-gold">{title}</p>
              <p className="mt-3 text-base font-bold leading-7 text-white/82">{copy}</p>
            </article>
          ))}
        </section>

        <section id="how-it-works" className="hud-window pixel-corners p-5 sm:p-6">
          <div className="mb-5">
            <p className="pixel-label text-base text-gold">How It Works</p>
            <h2 className="pixel-title mt-2 text-4xl font-black">Hold. Play. Earn. Win.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {steps.map(([title, copy]) => (
              <div key={title} className="pixel-stat pixel-corners p-4">
                <p className="pixel-label text-base text-gold">{title}</p>
                <p className="mt-3 text-base font-bold leading-7 text-white/80">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="leaderboard" className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="hud-window pixel-corners p-5 sm:p-6">
            <p className="pixel-label text-base text-gold">Leaderboard</p>
            <h2 className="pixel-title mt-2 text-4xl font-black">Compete. Climb. Earn.</h2>
            <p className="mt-4 text-xl font-black text-white">Your activity matters.</p>
            <p className="mt-3 text-base font-bold leading-7 text-white/82">
              Complete quests, play games, and stay engaged to improve your position on the leaderboard and unlock additional rewards.
            </p>
            <div className="mt-5">
              <PixelButton href="/dashboard" variant="secondary">Enter Dashboard</PixelButton>
            </div>
          </article>

          <article className="hud-window pixel-corners p-5 sm:p-6">
            <div className="mb-3 grid grid-cols-[1fr_1fr_0.7fr_1fr] gap-2 border-b border-gold/20 pb-2 pixel-label text-white/50">
              <span>Holder</span>
              <span>Held</span>
              <span>Share</span>
              <span>Reward</span>
            </div>
            <div className="space-y-2">
              {leaderboard.map(([wallet, held, share, reward]) => (
                <div key={wallet} className="inventory-row pixel-corners grid grid-cols-[1fr_1fr_0.7fr_1fr] gap-2 p-3 text-sm font-bold text-white/85">
                  <span className="pixel-font text-skyGame">{wallet}</span>
                  <span>{held}</span>
                  <span className="text-gold">{share}</span>
                  <span>{reward}</span>
                </div>
              ))}
            </div>
          </article>

          <article id="rewards" className="hud-window pixel-corners p-5 sm:p-6 lg:col-span-2">
            <p className="pixel-label text-base text-gold">Rewards</p>
            <h2 className="pixel-title mt-2 text-4xl font-black">Rewards Designed for Loyal Holders</h2>
            <p className="mt-4 text-base font-bold text-white/82">KINSCLUB holders can become eligible for:</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {rewards.map((reward) => (
                <div key={reward} className="inventory-row pixel-corners px-3 py-3 pixel-label text-sm text-white/85">
                  {reward}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section id="about" className="hud-window pixel-corners p-5 sm:p-6">
          <p className="pixel-label text-base text-gold">About</p>
          <h2 className="pixel-title mt-2 text-4xl font-black">What is KINSCLUB?</h2>
          <p className="mt-4 max-w-4xl text-base font-bold leading-7 text-white/82">
            KINSCLUB is an independent community rewards platform created for Kintara players and supporters.
          </p>
          <p className="mt-3 max-w-4xl text-base font-bold leading-7 text-white/82">
            By holding KINSCLUB and participating in community activities, members can earn KINS rewards and become eligible for exclusive giveaways and seasonal incentives.
          </p>
        </section>
      </div>
    </main>
  );
}
