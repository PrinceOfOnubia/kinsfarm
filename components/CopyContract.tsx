"use client";

import { useState } from "react";
import { PixelButton } from "@/components/PixelButton";

const contractAddress = "Official CA: Verify via KINSCLUB channels";

export function CopyContract({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    await navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={`pixel-corners flex min-w-0 items-center gap-2 border border-gold/40 bg-white/20 p-2 text-white backdrop-blur ${compact ? "w-full" : "max-w-xl"}`}>
      <div className="min-w-0 flex-1 px-2">
        <p className="pixel-label text-white/65">Contract Address</p>
        <p className="pixel-font truncate text-gold">{contractAddress}</p>
      </div>
      <PixelButton className="min-h-9 px-3 py-2 text-[10px]" onClick={copyAddress} type="button">
        {copied ? "Copied" : "⧉ Copy"}
      </PixelButton>
    </div>
  );
}
