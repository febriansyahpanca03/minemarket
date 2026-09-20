import AdminProductForm from "@/components/admin-product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Tambah Produk</h1>
      <p className="mt-1 text-sm text-slate-400">Buat produk baru untuk katalog toko.</p>

      <div className="mt-6">
        <AdminProductForm />
      </div>
    </div>
  );
}
