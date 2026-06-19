"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { WalletConnect } from "@/components/WalletConnect";

const menuLinks = [
  ["Dashboard", "/dashboard"],
  ["Leaderboard", "/#leaderboard"],
];

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
      {open && typeof document !== "undefined" ? createPortal(
        <div className="fixed inset-0 z-[2147483640] bg-[#05233d]/75 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="fixed left-3 right-3 top-20 max-h-[calc(100vh-6rem)] space-y-3 overflow-y-auto rounded-[1rem] border border-white/45 bg-[#123f68] p-4 text-white shadow-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/20 pb-3">
              <p className="pixel-title text-2xl font-black">KINSCLUB</p>
              <button className="pixel-corners border border-white/35 bg-white/15 px-3 py-2 pixel-label" type="button" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            {menuLinks.map(([label, href]) => (
              <Link key={href} className="pixel-corners block border border-white/25 bg-white/15 px-3 py-3 pixel-label" href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <WalletConnect className="w-full border-white/35 bg-[#315d84] text-white hover:bg-gold hover:text-[#52320b]" variant="secondary" />
          </div>
        </div>,
        document.body
      ) : null}
    </div>
  );
}
