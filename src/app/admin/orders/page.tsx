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
      <h1 className="text-2xl font-bold text-white">Orders</h1>
      <p className="mt-1 text-sm text-slate-400">Manage customer order statuses.</p>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-slate-400">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-white/10 bg-slate-900 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-sm text-slate-400">{order.orderCode}</p>
                  <p className="font-semibold text-white">{order.customerName}</p>
                  <p className="text-sm text-slate-400">
                    {order.customerEmail} &middot; {order.customerPhone}
                  </p>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {statusLabel[status]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-300">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="text-slate-200">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between border-t border-white/10 pt-4">
                <span className="font-semibold text-slate-300">Total</span>
                <span className="font-bold text-emerald-400">
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
