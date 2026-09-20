"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatRupiah } from "@/lib/format";

type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  imageUrl: string | null;
};

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") ?? "";
  const quantity = Number(searchParams.get("quantity") ?? "1");

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    paymentMethod: "QRIS",
  });

  useEffect(() => {
    if (!productId) return;

    fetch(`/api/products/by-id/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.product) setProduct(data.product);
        else setError("Product not found");
      })
      .finally(() => setLoading(false));
  }, [productId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: [{ productId, quantity }],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to place order");
        return;
      }

      router.push(`/track-order?code=${data.order.orderCode}`);
    } catch {
      setError("Something went wrong, please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!productId) {
    return <p className="text-slate-400">Product not found. Please choose a product first.</p>;
  }

  if (loading) {
    return <p className="text-slate-400">Loading...</p>;
  }

  if (!product) {
    return <p className="text-red-400">{error ?? "Product not found"}</p>;
  }

  const unitPrice = product.discountPrice ?? product.price;
  const total = unitPrice * quantity;

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
        <h2 className="font-semibold text-slate-200">Order Summary</h2>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-300">
            {product.name} x{quantity}
          </span>
          <span className="text-slate-200">{formatRupiah(unitPrice * quantity)}</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold text-emerald-400">{formatRupiah(total)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-slate-900 p-6">
        <h2 className="font-semibold text-slate-200">Buyer Details</h2>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-slate-400">Full Name</label>
            <input
              required
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">Email</label>
            <input
              required
              type="email"
              value={form.customerEmail}
              onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">Phone Number</label>
            <input
              required
              value={form.customerPhone}
              onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">Payment Method</label>
            <select
              value={form.paymentMethod}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            >
              <option value="QRIS">QRIS</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="E-Wallet">E-Wallet</option>
            </select>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-emerald-500 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
        >
          {submitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-2 text-slate-400">Fill in your details to complete the order.</p>

      <div className="mt-8">
        <Suspense fallback={<p className="text-slate-400">Loading...</p>}>
          <CheckoutForm />
        </Suspense>
      </div>
    </div>
  );
}
