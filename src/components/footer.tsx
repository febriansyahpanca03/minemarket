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
              MineMarket
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              Toko Minecraft terpercaya untuk akun, minecoin, diamond, dan bundle.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-200">Belanja</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/produk" className="hover:text-white">
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link href="/produk?category=akun-minecraft" className="hover:text-white">
                  Akun Minecraft
                </Link>
              </li>
              <li>
                <Link href="/produk?category=minecoin" className="hover:text-white">
                  Minecoin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-200">Bantuan</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/cek-pesanan" className="hover:text-white">
                  Cek Pesanan
                </Link>
              </li>
              <li>
                <a href="mailto:halo@minemarket.id" className="hover:text-white">
                  halo@minemarket.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} MineMarket. Semua hak dilindungi.
        </div>
      </div>
    </footer>
  );
}
