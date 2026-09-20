import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CaretRight, Lightning, ShieldCheck, ChatCircle } from "@phosphor-icons/react/dist/ssr";
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
      <div className="mb-6 flex items-center gap-1.5 text-sm text-cream/60">
        <Link href="/products" className="hover:text-cream">
          Products
        </Link>
        <CaretRight className="h-3.5 w-3.5" />
        <span className="text-cream/90">{product.name}</span>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-steel/35 bg-navy">
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
            <div className="flex h-full w-full items-center justify-center text-cream/35">
              No Image
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">
            {product.category.name}
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold leading-tight sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-cream">
              {formatRupiah(finalPrice)}
            </span>
            {product.discountPrice && (
              <>
                <span className="text-lg text-cream/45 line-through">
                  {formatRupiah(product.price)}
                </span>
                <span className="rounded-full bg-gold/12 px-2.5 py-1 text-xs font-bold text-gold">
                  Save {formatRupiah(product.price - product.discountPrice)}
                </span>
              </>
            )}
          </div>

          <p className="mt-2 text-sm text-cream/60">
            {product.stock > 0 ? (
              <>
                <span className="text-cream/90">{product.stock}</span> left in stock
              </>
            ) : (
              "Out of stock for now"
            )}
          </p>

          <p className="mt-6 whitespace-pre-line leading-relaxed text-cream/75">
            {product.description}
          </p>

          <div className="mt-8">
            <BuyBox productId={product.id} price={finalPrice} stock={product.stock} />
          </div>

          <ul className="mt-6 space-y-2.5 text-sm text-cream/60">
            <li className="flex items-start gap-2.5">
              <Lightning weight="fill" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Sent over within minutes of your payment clearing, most of the time.
            </li>
            <li className="flex items-start gap-2.5">
              <ShieldCheck weight="fill" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Stops working? Send the order code and we'll replace it.
            </li>
            <li className="flex items-start gap-2.5">
              <ChatCircle weight="fill" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Questions before you buy are fine. We'd rather you ask.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
