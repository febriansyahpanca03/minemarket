import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Minestack — Minecraft accounts, coins and skins",
  description:
    "We sell Minecraft accounts, Minecoins, diamonds and skin bundles. Pay, and it usually lands within a few minutes.",
  openGraph: {
    title: "Minestack — Minecraft accounts, coins and skins",
    description:
      "Accounts, Minecoins, diamonds and skin bundles. Most orders are done a few minutes after you pay.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-midnight text-cream">{children}</body>
    </html>
  );
}
