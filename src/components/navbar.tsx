import Link from "next/link";
import { Cube, MagnifyingGlass, ReceiptX } from "@phosphor-icons/react/dist/ssr";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-slate-950">
            <Cube weight="fill" className="h-5 w-5" />
          </span>
          <span className="text-lg">MineMarket</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
          <Link href="/produk" className="transition hover:text-white">
            Produk
          </Link>
          <Link href="/produk?category=akun-minecraft" className="transition hover:text-white">
            Akun
          </Link>
          <Link href="/produk?category=minecoin" className="transition hover:text-white">
            Minecoin
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/produk"
            className="hidden rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-white/25 hover:text-white sm:grid"
            aria-label="Cari produk"
          >
            <MagnifyingGlass className="h-4 w-4" />
          </Link>
          <Link
            href="/cek-pesanan"
            className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 active:scale-[0.98]"
          >
            <ReceiptX weight="bold" className="h-4 w-4" />
            Cek Pesanan
          </Link>
        </div>
      </div>
    </header>
  );
}
