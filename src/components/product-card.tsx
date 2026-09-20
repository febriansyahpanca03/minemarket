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
      href={`/produk/${slug}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_16px_40px_-20px_rgba(16,185,129,0.45)]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-slate-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-600">
            No Image
          </div>
        )}

        {discountPercent && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-bold text-slate-950">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-400">
          {categoryName}
        </p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-slate-100">{name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-white">{formatRupiah(finalPrice)}</span>
          {discountPrice && (
            <span className="text-xs text-slate-500 line-through">{formatRupiah(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
