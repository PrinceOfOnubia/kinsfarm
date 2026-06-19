import type { Metadata } from "next";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "KINSCLUB Rewards",
  description: "Community rewards platform for Kintara players and KINSCLUB holders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
