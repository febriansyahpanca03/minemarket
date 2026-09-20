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
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-8 w-8 rounded-full border border-white/20 text-lg leading-none hover:border-white/40"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            className="h-8 w-8 rounded-full border border-white/20 text-lg leading-none hover:border-white/40"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm text-slate-400">Total</span>
        <span className="text-xl font-bold text-white">{formatRupiah(price * quantity)}</span>
      </div>

      <button
        type="button"
        disabled={outOfStock}
        onClick={handleBuyNow}
        className="mt-6 w-full rounded-full bg-emerald-500 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        {outOfStock ? "Out of Stock" : "Buy Now"}
      </button>
    </div>
  );
}
