import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Lightning,
  Headset,
  GameController,
  Coins,
  Cube,
  Package,
} from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/product-card";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "akun-minecraft": GameController,
  minecoin: Coins,
  diamond: Cube,
  bundle: Package,
};

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-16 pb-20 md:grid-cols-[1.1fr_1fr] md:items-center md:pt-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Toko Minecraft Indonesia
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
              Semua kebutuhan Minecraft ada di sini.
            </h1>
            <p className="mt-4 max-w-md text-slate-300">
              Akun, minecoin, diamond, dan bundle dengan proses instan dan harga bersahabat.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/produk"
                className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 active:scale-[0.98]"
              >
                Belanja Sekarang
              </Link>
              <Link
                href="/cek-pesanan"
                className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-white/35 active:scale-[0.98]"
              >
                Cek Pesanan
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src="https://picsum.photos/seed/minemarket-hero-world/1200/900"
              alt="Dunia Minecraft"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="border-b border-white/10 bg-slate-900/40">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {categories.map((category) => {
                const Icon = categoryIcons[category.slug] ?? Package;
                return (
                  <Link
                    key={category.id}
                    href={`/produk?category=${category.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900 p-4 transition hover:border-emerald-500/40 hover:bg-slate-800"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-slate-100">{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Produk Terbaru</h2>
          <Link
            href="/produk"
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Lihat semua
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="mt-8 text-slate-400">
            Belum ada produk. Tambahkan produk melalui dashboard admin untuk mulai berjualan.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                discountPrice={product.discountPrice}
                imageUrl={product.imageUrl}
                categoryName={product.category.name}
              />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 md:col-span-2">
              <ShieldCheck weight="fill" className="h-8 w-8 text-emerald-400" />
              <h3 className="mt-4 text-xl font-bold text-white">Transaksi aman, garansi replace</h3>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                Setiap akun dan top up diverifikasi sebelum dikirim. Ada masalah, kami ganti tanpa
                ribet.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
              <Lightning weight="fill" className="h-8 w-8 text-emerald-400" />
              <h3 className="mt-4 text-lg font-bold text-white">Proses instan</h3>
              <p className="mt-2 text-sm text-slate-400">
                Pesanan diproses dalam hitungan menit setelah pembayaran masuk.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
              <Headset weight="fill" className="h-8 w-8 text-emerald-400" />
              <h3 className="mt-4 text-lg font-bold text-white">Admin siap bantu</h3>
              <p className="mt-2 text-sm text-slate-400">
                Tim support kami siap membantu setiap hari lewat halaman cek pesanan.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 md:col-span-2">
              <p className="text-base text-slate-200">
                "Beli minecoin di sini prosesnya cepat banget, ga sampai 10 menit udah masuk."
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-400">
                Raka Pratama, pelanggan MineMarket
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
