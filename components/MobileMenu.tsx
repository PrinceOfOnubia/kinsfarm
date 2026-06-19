"use client";

import Link from "next/link";
import { useState } from "react";
import { CopyContract } from "@/components/CopyContract";
import { WalletConnect } from "@/components/WalletConnect";
import { XIcon } from "@/components/XIcon";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-expanded={open}
        aria-label="Open menu"
        className="pixel-corners grid h-11 w-11 place-items-center border border-white/45 bg-[#315d84] text-white shadow-panel"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="pixel-font text-xl">{open ? "×" : "☰"}</span>
      </button>
      {open ? (
        <div className="fixed inset-0 z-[980] bg-[#05233d]/65 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="absolute left-3 right-3 top-20 space-y-3 rounded-[1rem] border border-white/45 bg-[#123f68] p-4 text-white shadow-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/20 pb-3">
              <p className="pixel-title text-2xl font-black">KINSCLUB</p>
              <button className="pixel-corners border border-white/35 bg-white/15 px-3 py-2 pixel-label" type="button" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <Link className="pixel-corners block border border-white/25 bg-white/15 px-3 py-3 pixel-label" href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link className="pixel-corners block border border-white/25 bg-white/15 px-3 py-3 pixel-label" href="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
            <CopyContract compact />
            <p className="pixel-label text-gold">Connect Wallet</p>
            <WalletConnect />
            <a
              href="https://x.com/kinsmenonsol"
              target="_blank"
              rel="noreferrer"
              aria-label="KINSCLUB on X"
              className="pixel-corners flex items-center justify-center gap-2 border border-white/35 bg-white/15 px-3 py-3 pixel-label"
            >
              <XIcon />
              <span>X</span>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
