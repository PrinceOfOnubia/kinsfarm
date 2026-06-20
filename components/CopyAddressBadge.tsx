"use client";

import { useState } from "react";

type CopyAddressBadgeProps = {
  label?: string;
  value: string;
  display?: string;
  className?: string;
};

export function CopyAddressBadge({ label = "CA", value, display = value, className = "" }: CopyAddressBadgeProps) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className={`pixel-corners inline-flex max-w-full items-center gap-2 border border-gold/55 bg-[#153b5f]/90 px-2.5 py-2 shadow-panel sm:px-3 ${className}`}>
      <span className="pixel-label shrink-0 text-[9px] text-white/55 sm:text-[10px]">{label}</span>
      <span className="pixel-font min-w-0 truncate text-xs text-gold sm:text-sm">{display}</span>
      <button
        type="button"
        onClick={copyAddress}
        aria-label={`Copy ${label}`}
        className="pixel-corners grid h-7 w-7 shrink-0 place-items-center border border-gold/50 bg-orangeCta text-[#43290c] transition hover:bg-gold"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" strokeLinejoin="miter">
          <rect x="8" y="8" width="10" height="10" />
          <path d="M6 16H4V4h12v2" />
        </svg>
      </button>
      {copied ? <span className="pixel-label text-[9px] text-grass sm:text-[10px]">Copied</span> : null}
    </div>
  );
}
