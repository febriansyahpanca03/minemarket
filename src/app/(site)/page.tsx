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
  "minecraft-accounts": GameController,
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
      <section className="border-b border-steel/35 bg-gradient-to-b from-navy/70 to-transparent">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-16 pb-20 md:grid-cols-[1.1fr_1fr] md:items-center md:pt-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Your Minecraft Store
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
              Everything you need for Minecraft, in one place.
            </h1>
            <p className="mt-4 max-w-md text-cream/75">
              Accounts, minecoin, diamonds, and bundles with instant delivery and fair prices.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-full bg-gold px-6 py-3 font-semibold text-midnight transition hover:bg-gold-light active:scale-[0.98]"
              >
                Shop Now
              </Link>
              <Link
                href="/track-order"
                className="rounded-full border border-steel/50 px-6 py-3 font-semibold text-cream transition hover:border-steel/75 active:scale-[0.98]"
              >
                Track Order
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-steel/35">
            <Image
              src="https://picsum.photos/seed/minestack-hero-world/1200/900"
              alt="Minecraft world"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/75 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="border-b border-steel/35 bg-navy/40">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {categories.map((category) => {
                const Icon = categoryIcons[category.slug] ?? Package;
                return (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-steel/35 bg-navy p-4 transition hover:border-gold/45 hover:bg-steel/20"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-cream">{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest Products</h2>
          <Link
            href="/products"
            className="text-sm font-semibold text-gold hover:text-gold-light"
          >
            View all
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="mt-8 text-cream/60">
            No products yet. Add products from the admin dashboard to start selling.
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

      <section className="border-t border-steel/35 bg-navy/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-steel/35 bg-navy p-8 md:col-span-2">
              <ShieldCheck weight="fill" className="h-8 w-8 text-gold" />
              <h3 className="mt-4 text-xl font-bold text-cream">Secure checkout, replacement guarantee</h3>
              <p className="mt-2 max-w-md text-sm text-cream/60">
                Every account and top up is verified before delivery. If something's wrong, we
                replace it, no hassle.
              </p>
            </div>
            <div className="rounded-3xl border border-steel/35 bg-navy p-8">
              <Lightning weight="fill" className="h-8 w-8 text-gold" />
              <h3 className="mt-4 text-lg font-bold text-cream">Instant delivery</h3>
              <p className="mt-2 text-sm text-cream/60">
                Orders are processed within minutes of payment confirmation.
              </p>
            </div>
            <div className="rounded-3xl border border-steel/35 bg-navy p-8">
              <Headset weight="fill" className="h-8 w-8 text-gold" />
              <h3 className="mt-4 text-lg font-bold text-cream">Support on hand</h3>
              <p className="mt-2 text-sm text-cream/60">
                Our team is ready to help every day through the track order page.
              </p>
            </div>
            <div className="rounded-3xl border border-steel/35 bg-navy p-8 md:col-span-2">
              <p className="text-base text-cream/90">
                "Bought minecoin here and it landed in under 10 minutes. Super fast."
              </p>
              <p className="mt-3 text-sm font-semibold text-cream/60">
                Marcus Webb, Minestack customer
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
