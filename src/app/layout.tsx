import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { CurrencyProvider } from "@/components/currency-provider";
import { BASE_CURRENCY, CURRENCY_COOKIE, getRates, isSupportedCurrency } from "@/lib/currency";

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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [cookieStore, { rates, updatedAt, live }] = await Promise.all([cookies(), getRates()]);

  const cookieCurrency = cookieStore.get(CURRENCY_COOKIE)?.value;
  const currency = isSupportedCurrency(cookieCurrency) ? cookieCurrency : BASE_CURRENCY;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-midnight text-cream">
        <CurrencyProvider
          value={{ currency, rate: rates[currency] ?? 1, live, updatedAt }}
        >
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
