import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/format";
import BuyBox from "@/components/buy-box";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product || !product.isActive) {
    notFound();
  }

  const finalPrice = product.discountPrice ?? product.price;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-center gap-1.5 text-sm text-slate-400">
        <Link href="/products" className="hover:text-white">
          Products
        </Link>
        <CaretRight className="h-3.5 w-3.5" />
        <span className="text-slate-200">{product.name}</span>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-600">
              No Image
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
            {product.category.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black text-white">{formatRupiah(finalPrice)}</span>
            {product.discountPrice && (
              <span className="text-lg text-slate-500 line-through">
                {formatRupiah(product.price)}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-slate-400">
            In stock: <span className="text-slate-200">{product.stock}</span>
          </p>

          <p className="mt-6 whitespace-pre-line text-slate-300">{product.description}</p>

          <div className="mt-8">
            <BuyBox
              productId={product.id}
              price={finalPrice}
              stock={product.stock}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
