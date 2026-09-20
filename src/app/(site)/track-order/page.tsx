"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatRupiah } from "@/lib/format";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { name: string };
};

type Order = {
  orderCode: string;
  customerName: string;
  status: string;
  totalAmount: number;
  paymentMethod: string | null;
  createdAt: string;
  items: OrderItem[];
};

const statusLabel: Record<string, string> = {
  PENDING: "Awaiting Payment",
  PAID: "Paid",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") ?? "";

  const [code, setCode] = useState(initialCode);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(searchCode: string) {
    if (!searchCode) return;
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${searchCode}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Order not found");
        return;
      }

      setOrder(data.order);
    } catch {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialCode) handleSearch(initialCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="pixel text-3xl font-bold">Where's my order?</h1>
      <p className="mt-2 text-cream/60">Paste the code from your receipt and we'll pull it up.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(code);
        }}
        className="mt-6 flex gap-3"
      >
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. MST-20260918-AB12CD"
          className="flex-1 rounded-lg border border-steel/35 bg-navy px-4 py-3 text-sm outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-gold px-6 py-3 font-semibold text-midnight hover:bg-gold-light disabled:opacity-60"
        >
          {loading ? "Looking..." : "Look up"}
        </button>
      </form>

      {error && <p className="mt-6 text-sm text-danger">{error}</p>}

      {order && (
        <div className="mt-8 rounded-2xl border border-steel/35 bg-navy p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-cream/60">{order.orderCode}</span>
            <span className="rounded-full bg-gold/12 px-3 py-1 text-xs font-semibold text-gold">
              {statusLabel[order.status] ?? order.status}
            </span>
          </div>

          <p className="mt-4 text-sm text-cream/60">Placed by</p>
          <p className="font-semibold">{order.customerName}</p>

          <div className="mt-4 space-y-2 border-t border-steel/35 pt-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-cream/75">
                  {item.product.name} x{item.quantity}
                </span>
                <span className="text-cream/90">{formatRupiah(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between border-t border-steel/35 pt-4">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-gold">
              {formatRupiah(order.totalAmount)}
            </span>
          </div>

          {order.paymentMethod && (
            <p className="mt-2 text-sm text-cream/60">Paid with {order.paymentMethod}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl px-4 py-12 text-cream/60">Loading...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
