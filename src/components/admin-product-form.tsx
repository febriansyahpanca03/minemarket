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
        setError(data.error ?? "Failed to save product");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Something went wrong, please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div>
        <label className="text-sm text-cream/60">Product Name</label>
        <input
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          className="mt-1 w-full rounded-lg border border-steel/35 bg-navy px-3 py-2 text-sm text-cream focus:border-gold"
        />
      </div>

      <div>
        <label className="text-sm text-cream/60">Slug (URL)</label>
        <input
          required
          value={values.slug}
          onChange={(e) => update("slug", e.target.value)}
          placeholder="e.g. minecraft-java-account"
          className="mt-1 w-full rounded-lg border border-steel/35 bg-navy px-3 py-2 text-sm text-cream focus:border-gold"
        />
      </div>

      <div>
        <label className="text-sm text-cream/60">Description</label>
        <textarea
          required
          rows={4}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          className="mt-1 w-full rounded-lg border border-steel/35 bg-navy px-3 py-2 text-sm text-cream focus:border-gold"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-cream/60">Price</label>
          <input
            required
            type="number"
            min={0}
            value={values.price}
            onChange={(e) => update("price", e.target.value)}
            className="mt-1 w-full rounded-lg border border-steel/35 bg-navy px-3 py-2 text-sm text-cream focus:border-gold"
          />
        </div>
        <div>
          <label className="text-sm text-cream/60">Discount Price (optional)</label>
          <input
            type="number"
            min={0}
            value={values.discountPrice}
            onChange={(e) => update("discountPrice", e.target.value)}
            className="mt-1 w-full rounded-lg border border-steel/35 bg-navy px-3 py-2 text-sm text-cream focus:border-gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-cream/60">Stock</label>
          <input
            required
            type="number"
            min={0}
            value={values.stock}
            onChange={(e) => update("stock", e.target.value)}
            className="mt-1 w-full rounded-lg border border-steel/35 bg-navy px-3 py-2 text-sm text-cream focus:border-gold"
          />
        </div>
        <div>
          <label className="text-sm text-cream/60">Product Type</label>
          <select
            value={values.type}
            onChange={(e) => update("type", e.target.value)}
            className="mt-1 w-full rounded-lg border border-steel/35 bg-navy px-3 py-2 text-sm text-cream focus:border-gold"
          >
            <option value="ACCOUNT">Account</option>
            <option value="DIAMOND">Diamond</option>
            <option value="MINECOIN">Minecoin</option>
            <option value="BUNDLE">Bundle</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-cream/60">Category</label>
        <select
          required
          value={values.categoryId}
          onChange={(e) => update("categoryId", e.target.value)}
          className="mt-1 w-full rounded-lg border border-steel/35 bg-navy px-3 py-2 text-sm text-cream focus:border-gold"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-cream/60">Image URL (optional)</label>
        <input
          value={values.imageUrl}
          onChange={(e) => update("imageUrl", e.target.value)}
          placeholder="https://..."
          className="mt-1 w-full rounded-lg border border-steel/35 bg-navy px-3 py-2 text-sm text-cream focus:border-gold"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-cream/75">
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(e) => update("isActive", e.target.checked)}
        />
        Active (visible in the store)
      </label>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-midnight hover:bg-gold-light disabled:opacity-60"
      >
        {submitting ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}
