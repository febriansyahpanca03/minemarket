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
      <h1 className="text-3xl font-bold">Semua Produk</h1>
      <p className="mt-2 text-slate-400">Pilih produk Minecraft yang kamu butuhkan.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/produk"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            !category
              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
              : "border-white/10 text-slate-300 hover:border-white/25 hover:text-white"
          }`}
        >
          Semua
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/produk?category=${cat.slug}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              category === cat.slug
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 text-slate-300 hover:border-white/25 hover:text-white"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="mt-10 text-slate-400">Belum ada produk pada kategori ini.</p>
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
    </div>
  );
}
