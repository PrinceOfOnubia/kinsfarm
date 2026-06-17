"use client";

import Link from "next/link";
import { useState } from "react";
import { CopyContract } from "@/components/CopyContract";
import { WalletConnect } from "@/components/WalletConnect";
import { XIcon } from "@/components/XIcon";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        aria-expanded={open}
        aria-label="Open menu"
        className="pixel-corners grid h-11 w-11 place-items-center border border-white/35 bg-white/15 text-white"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="pixel-font text-xl">{open ? "×" : "☰"}</span>
      </button>
      {open ? (
        <div className="absolute right-0 top-14 z-50 w-[min(88vw,22rem)] space-y-3 rounded-[1rem] border border-white/40 bg-[#123f68]/90 p-3 text-white shadow-panel backdrop-blur-xl">
          <Link className="pixel-corners block border border-white/25 bg-white/15 px-3 py-3 pixel-label" href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link className="pixel-corners block border border-white/25 bg-white/15 px-3 py-3 pixel-label" href="/dashboard" onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <CopyContract compact />
          <WalletConnect />
          <a
            href="https://x.com/kinsmenonsol"
            target="_blank"
            rel="noreferrer"
            aria-label="$KINSFARM on X"
            className="pixel-corners flex items-center justify-center gap-2 border border-white/35 bg-white/15 px-3 py-3 pixel-label"
          >
            <XIcon />
            <span>X</span>
          </a>
        </div>
      ) : null}
    </div>
  );
}
