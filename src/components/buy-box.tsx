"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMoney } from "@/components/currency-provider";

type BuyBoxProps = {
  productId: string;
  price: number;
  stock: number;
};

export default function BuyBox({ productId, price, stock }: BuyBoxProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const money = useMoney();

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
            aria-label="Fewer"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-9 w-9 rounded-full border border-steel/55 text-lg leading-none transition hover:border-gold hover:text-gold"
          >
            -
          </button>
          <span className="font-display w-8 text-center text-lg font-semibold">{quantity}</span>
          <button
            type="button"
            aria-label="More"
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            className="h-9 w-9 rounded-full border border-steel/55 text-lg leading-none transition hover:border-gold hover:text-gold"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-steel/35 pt-5">
        <span className="text-sm text-cream/60">Total</span>
        <span className="font-display text-2xl font-bold text-gold">
          {money(price * quantity)}
        </span>
      </div>

      <button
        type="button"
        disabled={outOfStock}
        onClick={handleBuyNow}
        className="mt-6 w-full rounded-full bg-gold py-3.5 font-semibold text-midnight transition hover:bg-gold-light active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-steel/40 disabled:text-cream/60"
      >
        {outOfStock ? "Out of stock" : "Buy now"}
      </button>
    </div>
  );
}
