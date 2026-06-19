"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PixelButton } from "@/components/PixelButton";
import { truncateWallet } from "@/lib/rewardEngine";

type WalletConnectProps = {
  className?: string;
  variant?: "gold" | "green" | "secondary";
};

export function WalletConnect({ className = "", variant = "green" }: WalletConnectProps) {
  const { connected, connecting, disconnect, publicKey, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ right: 16, top: 72 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const address = publicKey?.toBase58();

  useEffect(() => {
    if (!open) {
      return;
    }

    function updatePosition() {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      setMenuPosition({
        right: Math.max(12, window.innerWidth - rect.right),
        top: rect.bottom + 10,
      });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  if (connected && address) {
    return (
      <div ref={buttonRef} className="relative">
        <PixelButton className={`w-full ${className}`} onClick={() => setOpen((value) => !value)} type="button">
          {truncateWallet(address)}
        </PixelButton>
        {open && typeof document !== "undefined" ? createPortal(
          <>
            <button
              aria-label="Close wallet menu"
              className="fixed inset-0 z-[2147483642]"
              type="button"
              onClick={() => setOpen(false)}
            />
            <div
              className="fixed z-[2147483643] w-[min(18rem,calc(100vw-1.5rem))] space-y-2 rounded-[1rem] border border-white/40 bg-[#123f68] p-3 text-white shadow-panel"
              style={{ right: menuPosition.right, top: menuPosition.top }}
            >
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
          </>,
          document.body
        ) : null}
      </div>
    );
  }

  return (
    <PixelButton className={className} variant={variant} onClick={() => setVisible(true)} type="button">
      {connecting ? "Connecting" : "Connect Wallet"}
    </PixelButton>
  );
}
