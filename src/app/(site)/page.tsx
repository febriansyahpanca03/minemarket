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
  Quotes,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/format";
import ProductCard from "@/components/product-card";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "minecraft-accounts": GameController,
  minecoin: Coins,
  diamond: Cube,
  bundle: Package,
};

const steps = [
  { n: "01", title: "Pick what you need", body: "Browse the shop and choose your amount." },
  { n: "02", title: "Pay how you like", body: "QRIS, bank transfer or e-wallet at checkout." },
  { n: "03", title: "We send it over", body: "Usually within minutes. Track it with your code." },
];

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

  const featured = products.find((p) => p.discountPrice) ?? products[0];

  return (
    <div>
      <section className="relative overflow-hidden border-b border-steel/35">
        <div className="block-grid pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pt-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Minecraft shop
            </p>
            <h1 className="font-display mt-5 text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Get back to building.
              <span className="block text-gold">We handle the rest.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/70">
              Accounts, Minecoins, diamonds and skin bundles. Most orders are done a few minutes
              after you pay.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="group flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-midnight transition hover:bg-gold-light active:scale-[0.98]"
              >
                See what's in stock
                <ArrowRight
                  weight="bold"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/track-order"
                className="rounded-full border border-steel/50 px-6 py-3 font-semibold text-cream transition hover:border-steel/80 hover:bg-navy active:scale-[0.98]"
              >
                Track Order
              </Link>
            </div>
          </div>

          {featured && (
            <div className="relative">
              <Link
                href={`/products/${featured.slug}`}
                className="group block overflow-hidden rounded-3xl border border-steel/35 bg-navy transition hover:border-gold/45"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-steel/20">
                  {featured.imageUrl && (
                    <Image
                      src={featured.imageUrl}
                      alt={featured.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
                  {featured.discountPrice && (
                    <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-midnight">
                      Save{" "}
                      {Math.round(
                        ((featured.price - featured.discountPrice) / featured.price) * 100
                      )}
                      %
                    </span>
                  )}
                </div>

                <div className="flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                      Popular right now
                    </p>
                    <h2 className="font-display mt-1.5 text-lg font-semibold leading-snug text-cream">
                      {featured.name}
                    </h2>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-2xl font-bold text-cream">
                      {formatRupiah(featured.discountPrice ?? featured.price)}
                    </p>
                    {featured.discountPrice && (
                      <p className="text-sm text-cream/45 line-through">
                        {formatRupiah(featured.price)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {categories.length > 0 && (
        <section className="border-b border-steel/35 bg-navy/30">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 divide-steel/25 sm:grid-cols-4 sm:divide-x">
              {categories.map((category) => {
                const Icon = categoryIcons[category.slug] ?? Package;
                return (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className="group flex items-center gap-3 px-4 py-6 transition hover:bg-navy"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold transition group-hover:bg-gold group-hover:text-midnight">
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

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold tracking-tight">Just added</h2>
          <Link
            href="/products"
            className="group flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light"
          >
            See all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="mt-8 text-cream/60">
            Shelves are empty. Add something from the admin dashboard.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                discountPrice={product.discountPrice}
                imageUrl={product.imageUrl}
                categoryName={product.category.name}
                stock={product.stock}
              />
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-steel/35 bg-navy/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl font-bold tracking-tight">How it works</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n} className="border-t border-steel/35 pt-5">
                <span className="font-mono text-sm text-gold">{step.n}</span>
                <h3 className="font-display mt-2 text-lg font-semibold text-cream">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/60">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="card-surface rounded-2xl p-7 sm:col-span-2">
              <ShieldCheck weight="fill" className="h-7 w-7 text-gold" />
              <h3 className="font-display mt-4 text-xl font-semibold text-cream">
                If it breaks, we swap it
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-cream/60">
                Every account gets logged into and checked before it goes out. If yours stops
                working later, send us the order code and we'll sort you a new one.
              </p>
            </div>

            <div className="card-surface rounded-2xl p-7">
              <Lightning weight="fill" className="h-7 w-7 text-gold" />
              <h3 className="font-display mt-4 text-base font-semibold text-cream">
                Usually a few minutes
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">
                We start the moment your payment clears. Late nights and weekends included.
              </p>
            </div>

            <div className="card-surface rounded-2xl p-7">
              <Headset weight="fill" className="h-7 w-7 text-gold" />
              <h3 className="font-display mt-4 text-base font-semibold text-cream">
                You get a person
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">
                No ticket queue. Look up your order code and message us from there.
              </p>
            </div>
          </div>

          <figure className="card-surface flex flex-col justify-between rounded-2xl p-7">
            <Quotes weight="fill" className="h-8 w-8 text-gold/40" />
            <blockquote className="font-display mt-5 text-xl leading-snug text-cream">
              Ordered coins at 2am expecting to wait until morning. Had them in six minutes.
            </blockquote>
            <figcaption className="mt-6 border-t border-steel/35 pt-5 text-sm">
              <span className="font-semibold text-cream">Tom Vasquez</span>
              <span className="block text-cream/55">bought Minecoin 1720</span>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
