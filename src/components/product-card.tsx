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
};

export default function ProductCard({
  slug,
  name,
  price,
  discountPrice,
  imageUrl,
  categoryName,
}: ProductCardProps) {
  const finalPrice = discountPrice ?? price;
  const discountPercent = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;

  return (
    <Link
      href={`/products/${slug}`}
      className="group overflow-hidden rounded-2xl border border-steel/35 bg-navy transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_16px_40px_-20px_rgba(212,175,55,0.5)]"
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
            No Image
          </div>
        )}

        {discountPercent && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-midnight">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gold">
          {categoryName}
        </p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-cream">{name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-cream">{formatRupiah(finalPrice)}</span>
          {discountPrice && (
            <span className="text-xs text-cream/45 line-through">{formatRupiah(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
