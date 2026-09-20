"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatRupiah } from "@/lib/format";

type BuyBoxProps = {
  productId: string;
  price: number;
  stock: number;
};

export default function BuyBox({ productId, price, stock }: BuyBoxProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const outOfStock = stock <= 0;

  function handleBuyNow() {
    router.push(`/checkout?productId=${productId}&quantity=${quantity}`);
  }

  return (
    <div className="rounded-2xl border border-steel/35 bg-navy p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-cream/75">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-8 w-8 rounded-full border border-steel/55 text-lg leading-none hover:border-steel/80"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            className="h-8 w-8 rounded-full border border-steel/55 text-lg leading-none hover:border-steel/80"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-steel/35 pt-4">
        <span className="text-sm text-cream/60">Total</span>
        <span className="text-xl font-bold text-cream">{formatRupiah(price * quantity)}</span>
      </div>

      <button
        type="button"
        disabled={outOfStock}
        onClick={handleBuyNow}
        className="mt-6 w-full rounded-full bg-gold py-3 font-semibold text-midnight transition hover:bg-gold-light disabled:cursor-not-allowed disabled:bg-steel/40 disabled:text-cream/60"
      >
        {outOfStock ? "Out of Stock" : "Buy Now"}
      </button>
    </div>
  );
}
