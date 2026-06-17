import Link from "next/link";
import { CopyContract } from "@/components/CopyContract";
import { XIcon } from "@/components/XIcon";

export function SiteFooter() {
  return (
    <footer className="relative z-10 px-3 pb-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 rounded-[1rem] border border-white/35 bg-white/20 p-4 text-white shadow-panel backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <Link href="/" className="inline-flex min-w-0 items-center gap-3">
          <span className="coin grid h-9 w-9 place-items-center pixel-font text-sm">$</span>
          <span className="pixel-title text-xl font-black">$KINSFARM</span>
        </Link>
        <CopyContract compact />
        <a
          href="https://x.com/kinsmenonsol"
          target="_blank"
          rel="noreferrer"
          aria-label="$KINSFARM on X"
          className="pixel-corners inline-flex items-center justify-center gap-2 border border-white/35 bg-white/15 px-3 py-2 pixel-label text-white transition hover:bg-gold hover:text-[#52320b]"
        >
          <XIcon />
          <span>@kinsmenonsol</span>
        </a>
      </div>
    </footer>
  );
}
