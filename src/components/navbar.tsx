import Link from "next/link";
import { Cube, ReceiptX } from "@phosphor-icons/react/dist/ssr";
import CurrencySwitcher from "@/components/currency-switcher";

const links = [
  { href: "/products", label: "Products" },
  { href: "/products?category=minecraft-accounts", label: "Accounts" },
  { href: "/products?category=minecoin", label: "Minecoin" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-steel/35 bg-midnight/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 text-cream">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold text-midnight">
            <Cube weight="fill" className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">Minestack</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-cream/70 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative py-1 transition hover:text-cream after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <CurrencySwitcher />
          <Link
            href="/track-order"
            className="flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-midnight transition hover:bg-gold-light active:scale-[0.98]"
          >
            <ReceiptX weight="bold" className="h-4 w-4" />
            <span className="hidden sm:inline">Track Order</span>
            <span className="sm:hidden">Track</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
