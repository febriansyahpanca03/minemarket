import Link from "next/link";
import { Cube, MagnifyingGlass, ReceiptX } from "@phosphor-icons/react/dist/ssr";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-steel/35 bg-midnight/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-cream">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold text-midnight">
            <Cube weight="fill" className="h-5 w-5" />
          </span>
          <span className="pixel text-xl">Minestack</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-cream/75 md:flex">
          <Link href="/products" className="transition hover:text-cream">
            Products
          </Link>
          <Link href="/products?category=minecraft-accounts" className="transition hover:text-cream">
            Accounts
          </Link>
          <Link href="/products?category=minecoin" className="transition hover:text-cream">
            Minecoin
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="hidden rounded-full border border-steel/35 p-2 text-cream/75 transition hover:border-steel/70 hover:text-cream sm:grid"
            aria-label="Search products"
          >
            <MagnifyingGlass className="h-4 w-4" />
          </Link>
          <Link
            href="/track-order"
            className="flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-midnight transition hover:bg-gold-light active:scale-[0.98]"
          >
            <ReceiptX weight="bold" className="h-4 w-4" />
            Track Order
          </Link>
        </div>
      </div>
    </header>
  );
}
