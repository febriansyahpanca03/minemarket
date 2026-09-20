import Link from "next/link";
import { Cube } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="border-t border-steel/35 bg-midnight">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-cream">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold text-midnight">
                <Cube weight="fill" className="h-5 w-5" />
              </span>
              <span className="font-display text-xl">Minestack</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-cream/60">
              We sell Minecraft accounts, coins and skins. That's the whole business.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-cream/90">Shop</p>
            <ul className="mt-3 space-y-2 text-sm text-cream/60">
              <li>
                <Link href="/products" className="hover:text-cream">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=minecraft-accounts" className="hover:text-cream">
                  Minecraft Accounts
                </Link>
              </li>
              <li>
                <Link href="/products?category=minecoin" className="hover:text-cream">
                  Minecoin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-cream/90">Need help</p>
            <ul className="mt-3 space-y-2 text-sm text-cream/60">
              <li>
                <Link href="/track-order" className="hover:text-cream">
                  Track Order
                </Link>
              </li>
              <li>
                <a href="mailto:hello@minestack.app" className="hover:text-cream">
                  hello@minestack.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-steel/35 pt-6 text-xs text-cream/45">
          &copy; {new Date().getFullYear()} Minestack. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
