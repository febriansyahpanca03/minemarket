import Link from "next/link";
import Image from "next/image";
import { formatRupiah } from "@/lib/format";

type ProductCardProps = {
  slug: string;
  name: string;
  price: number;
  discountPrice: number | null;
  imageUrl: string | null;
  categoryName: string;
  stock?: number;
};

export default function ProductCard({
  slug,
  name,
  price,
  discountPrice,
  imageUrl,
  categoryName,
  stock,
}: ProductCardProps) {
  const finalPrice = discountPrice ?? price;
  const discountPercent = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;
  const lowStock = typeof stock === "number" && stock > 0 && stock <= 20;
  const soldOut = stock === 0;

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-steel/35 bg-navy transition duration-300 hover:-translate-y-1 hover:border-gold/45"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-steel/20">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-cream/35">
            No image
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy to-transparent" />

        {discountPercent && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-midnight">
            -{discountPercent}%
          </span>
        )}

        {soldOut && (
          <span className="absolute right-3 top-3 rounded-full bg-midnight/85 px-2.5 py-1 text-xs font-semibold text-cream/70">
            Sold out
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-cream/45">
          {categoryName}
        </p>
        <h3 className="font-display mt-1.5 line-clamp-2 text-[15px] font-semibold leading-snug text-cream">
          {name}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <p className="font-display text-lg font-bold text-cream">
              {formatRupiah(finalPrice)}
            </p>
            {discountPrice && (
              <p className="text-xs text-cream/40 line-through">{formatRupiah(price)}</p>
            )}
          </div>
          {lowStock && (
            <span className="pb-1 text-[11px] font-medium text-gold">{stock} left</span>
          )}
        </div>
      </div>
    </Link>
  );
}
