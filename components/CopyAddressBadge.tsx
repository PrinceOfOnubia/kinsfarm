"use client";

import { useState } from "react";

type CopyAddressBadgeProps = {
  label?: string;
  value: string;
  display?: string;
};

export function CopyAddressBadge({ label = "CA", value, display = value }: CopyAddressBadgeProps) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="pixel-corners inline-flex max-w-full items-center gap-2 border border-gold/55 bg-[#153b5f]/85 px-3 py-2 shadow-panel sm:px-4">
      <span className="pixel-label shrink-0 text-[10px] text-white/55 sm:text-xs">{label}</span>
      <span className="pixel-font min-w-0 truncate text-sm text-gold sm:text-base">{display}</span>
      <button
        type="button"
        onClick={copyAddress}
        aria-label={`Copy ${label}`}
        className="pixel-corners grid h-8 w-8 shrink-0 place-items-center border border-gold/50 bg-orangeCta text-[#43290c] transition hover:bg-gold"
      >
        <span aria-hidden="true" className="text-sm font-black">
          ⧉
        </span>
      </button>
      {copied ? <span className="pixel-label text-[10px] text-grass">Copied</span> : null}
    </div>
  );
}
