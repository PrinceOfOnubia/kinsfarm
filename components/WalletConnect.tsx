"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PixelButton } from "@/components/PixelButton";
import { truncateWallet } from "@/lib/mockRewards";

export function WalletConnect() {
  const { connected, connecting, disconnect, publicKey, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const address = publicKey?.toBase58();

  if (connected && address) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="pixel-corners border border-skyGame/40 bg-[#123f68]/55 px-4 py-3">
          <p className="pixel-label text-gold">{wallet?.adapter.name ?? "Wallet"}</p>
          <p className="pixel-font text-skyGame">{truncateWallet(address)}</p>
        </div>
        <PixelButton onClick={() => void disconnect()} type="button">
          Disconnect
        </PixelButton>
      </div>
    );
  }

  return (
    <PixelButton variant="green" onClick={() => setVisible(true)} type="button">
      {connecting ? "Connecting" : "Connect Wallet"}
    </PixelButton>
  );
}
