"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { PixelButton } from "@/components/PixelButton";
import { truncateWallet } from "@/lib/mockRewards";

export function WalletConnect() {
  const { connected, connecting, disconnect, publicKey, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const [open, setOpen] = useState(false);
  const address = publicKey?.toBase58();

  if (connected && address) {
    return (
      <div className="relative">
        <PixelButton className="w-full" onClick={() => setOpen((value) => !value)} type="button">
          {truncateWallet(address)}
        </PixelButton>
        {open ? (
          <div className="absolute right-0 top-14 z-50 w-64 space-y-2 rounded-[1rem] border border-white/40 bg-[#123f68]/95 p-3 text-white shadow-panel backdrop-blur-xl">
            <div className="pixel-corners border border-gold/35 bg-white/15 p-3">
              <p className="pixel-label text-gold">{wallet?.adapter.name ?? "Wallet"}</p>
              <p className="pixel-font truncate text-skyGame">{address}</p>
            </div>
            <button
              className="pixel-corners block w-full border border-white/25 bg-white/15 px-3 py-3 text-left pixel-label"
              type="button"
              onClick={() => {
                void navigator.clipboard.writeText(address);
                setOpen(false);
              }}
            >
              Copy Address
            </button>
            <button
              className="pixel-corners block w-full border border-orangeCta/45 bg-orangeCta/20 px-3 py-3 text-left pixel-label text-gold"
              type="button"
              onClick={() => {
                setOpen(false);
                void disconnect();
              }}
            >
              Disconnect Wallet
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <PixelButton variant="green" onClick={() => setVisible(true)} type="button">
      {connecting ? "Connecting" : "Connect Wallet"}
    </PixelButton>
  );
}
