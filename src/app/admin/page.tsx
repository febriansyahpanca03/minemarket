import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/format";

export default async function AdminOverviewPage() {
  const [productCount, orderCount, pendingCount, revenueAgg] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { in: ["PAID", "PROCESSING", "COMPLETED"] } },
    }),
  ]);

  const stats = [
    { label: "Total Products", value: productCount },
    { label: "Total Orders", value: orderCount },
    { label: "Awaiting Payment", value: pendingCount },
    { label: "Total Revenue", value: formatRupiah(revenueAgg._sum.totalAmount ?? 0) },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-cream">Overview</h1>
      <p className="mt-1 text-sm text-cream/60">A snapshot of your store's performance.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-steel/35 bg-navy p-6"
          >
            <p className="text-sm text-cream/60">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-cream">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
