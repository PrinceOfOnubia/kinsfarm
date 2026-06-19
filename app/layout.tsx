import type { Metadata } from "next";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://kinsfarm.vercel.app"),
  title: "KINSCLUB Rewards",
  description: "Community rewards platform for Kintara players and KINSCLUB holders.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "KINSCLUB Rewards",
    description: "Hold KINSCLUB. Earn KINS rewards. Win memberships.",
    images: [
      {
        url: "/images/kinsclub-og.jpg",
        width: 1280,
        height: 640,
        alt: "KINSCLUB - Club of Kintara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KINSCLUB Rewards",
    description: "Hold KINSCLUB. Earn KINS rewards. Win memberships.",
    images: ["/images/kinsclub-og.jpg"],
  },
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
