import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/product-card";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        isActive: true,
        ...(category ? { category: { slug: category } } : {}),
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold">The shop</h1>
      <p className="mt-2 text-cream/60">Everything we have in stock right now.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            !category
              ? "border-gold bg-gold/12 text-gold"
              : "border-steel/35 text-cream/75 hover:border-steel/70 hover:text-cream"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              category === cat.slug
                ? "border-gold bg-gold/12 text-gold"
                : "border-steel/35 text-cream/75 hover:border-steel/70 hover:text-cream"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-steel/40 px-6 py-16 text-center">
          <p className="font-display text-lg text-cream">Nothing here right now</p>
          <p className="mt-2 text-sm text-cream/55">
            This category is empty at the moment. Try another one.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-full border border-steel/50 px-5 py-2 text-sm font-semibold text-cream transition hover:border-gold hover:text-gold"
          >
            See everything
          </Link>
        </div>
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
    </div>
  );
}
