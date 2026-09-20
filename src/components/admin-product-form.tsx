"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string };

type ProductFormValues = {
  name: string;
  slug: string;
  description: string;
  price: string;
  discountPrice: string;
  stock: string;
  imageUrl: string;
  type: string;
  isActive: boolean;
  categoryId: string;
};

const emptyValues: ProductFormValues = {
  name: "",
  slug: "",
  description: "",
  price: "",
  discountPrice: "",
  stock: "0",
  imageUrl: "",
  type: "OTHER",
  isActive: true,
  categoryId: "",
};

type AdminProductFormProps = {
  productId?: string;
  initialValues?: Partial<ProductFormValues>;
};

export default function AdminProductForm({ productId, initialValues }: AdminProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [values, setValues] = useState<ProductFormValues>({ ...emptyValues, ...initialValues });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories ?? []));
  }, []);

  function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      name: values.name,
      slug: values.slug,
      description: values.description,
      price: Number(values.price),
      discountPrice: values.discountPrice ? Number(values.discountPrice) : null,
      stock: Number(values.stock),
      imageUrl: values.imageUrl || null,
      type: values.type,
      isActive: values.isActive,
      categoryId: values.categoryId,
    };

    try {
      const res = await fetch(
        productId ? `/api/admin/products/${productId}` : "/api/admin/products",
        {
          method: productId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Gagal menyimpan produk");
        return;
      }

      router.push("/admin/produk");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan, coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div>
        <label className="text-sm text-slate-400">Nama Produk</label>
        <input
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="text-sm text-slate-400">Slug (URL)</label>
        <input
          required
          value={values.slug}
          onChange={(e) => update("slug", e.target.value)}
          placeholder="contoh: akun-minecraft-java"
          className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="text-sm text-slate-400">Deskripsi</label>
        <textarea
          required
          rows={4}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-400">Harga</label>
          <input
            required
            type="number"
            min={0}
            value={values.price}
            onChange={(e) => update("price", e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400">Harga Diskon (opsional)</label>
          <input
            type="number"
            min={0}
            value={values.discountPrice}
            onChange={(e) => update("discountPrice", e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-400">Stok</label>
          <input
            required
            type="number"
            min={0}
            value={values.stock}
            onChange={(e) => update("stock", e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400">Tipe Produk</label>
          <select
            value={values.type}
            onChange={(e) => update("type", e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
          >
            <option value="ACCOUNT">Akun</option>
            <option value="DIAMOND">Diamond</option>
            <option value="MINECOIN">Minecoin</option>
            <option value="BUNDLE">Bundle</option>
            <option value="OTHER">Lainnya</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-slate-400">Kategori</label>
        <select
          required
          value={values.categoryId}
          onChange={(e) => update("categoryId", e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
        >
          <option value="" disabled>
            Pilih kategori
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-slate-400">URL Gambar (opsional)</label>
        <input
          value={values.imageUrl}
          onChange={(e) => update("imageUrl", e.target.value)}
          placeholder="https://..."
          className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(e) => update("isActive", e.target.checked)}
        />
        Aktif (tampil di toko)
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
      >
        {submitting ? "Menyimpan..." : "Simpan Produk"}
      </button>
    </form>
  );
}
