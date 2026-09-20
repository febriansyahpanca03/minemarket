import Link from "next/link";
import { Cube } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-white">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-slate-950">
                <Cube weight="fill" className="h-5 w-5" />
              </span>
              Minestack
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              A trusted Minecraft store for accounts, minecoin, diamonds, and bundles.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-200">Shop</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/products" className="hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=minecraft-accounts" className="hover:text-white">
                  Minecraft Accounts
                </Link>
              </li>
              <li>
                <Link href="/products?category=minecoin" className="hover:text-white">
                  Minecoin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-200">Support</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/track-order" className="hover:text-white">
                  Track Order
                </Link>
              </li>
              <li>
                <a href="mailto:hello@minestack.app" className="hover:text-white">
                  hello@minestack.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Minestack. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
