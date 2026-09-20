"use client";

import { useEffect, useState } from "react";
import { formatRupiah } from "@/lib/format";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { name: string };
};

type Order = {
  id: string;
  orderCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
};

const statusOptions = ["PENDING", "PAID", "PROCESSING", "COMPLETED", "CANCELLED"];

const statusLabel: Record<string, string> = {
  PENDING: "Awaiting Payment",
  PAID: "Paid",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data.orders ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleStatusChange(id: string, status: string) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-cream">Orders</h1>
      <p className="mt-1 text-sm text-cream/60">Move orders along as you fill them.</p>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-cream/60">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-cream/60">Nothing has come in yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-steel/35 bg-navy p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-sm text-cream/60">{order.orderCode}</p>
                  <p className="font-semibold text-cream">{order.customerName}</p>
                  <p className="text-sm text-cream/60">
                    {order.customerEmail} &middot; {order.customerPhone}
                  </p>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="rounded-lg border border-steel/35 bg-steel/20 px-3 py-2 text-sm text-cream outline-none focus:border-gold"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {statusLabel[status]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 space-y-1 border-t border-steel/35 pt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-cream/75">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="text-cream/90">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between border-t border-steel/35 pt-4">
                <span className="font-semibold text-cream/75">Total</span>
                <span className="font-bold text-gold">
                  {formatRupiah(order.totalAmount)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
