import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$KINSFARM Reward Engine",
  description: "Pixel MMO reward dashboard for KINSFARM holders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
