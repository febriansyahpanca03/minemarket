"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatRupiah } from "@/lib/format";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  isActive: boolean;
  category: { name: string };
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data.products ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    loadProducts();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cream">Products</h1>
          <p className="mt-1 text-sm text-cream/60">Everything listed in the shop.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-midnight hover:bg-gold-light"
        >
          + Add Product
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-steel/35">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy text-cream/60">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-steel/25 bg-midnight">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-cream/60">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-cream/60">
                  Nothing listed yet.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3 text-cream/90">{product.name}</td>
                  <td className="px-4 py-3 text-cream/60">{product.category.name}</td>
                  <td className="px-4 py-3 text-cream/90">
                    {formatRupiah(product.discountPrice ?? product.price)}
                  </td>
                  <td className="px-4 py-3 text-cream/90">{product.stock}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        product.isActive
                          ? "bg-gold/12 text-gold"
                          : "bg-steel/40 text-cream/60"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-gold hover:text-gold-light"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-danger transition hover:text-danger/75"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
