import AdminProductForm from "@/components/admin-product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-cream">Add Product</h1>
      <p className="mt-1 text-sm text-cream/60">Create a new product for the store catalog.</p>

      <div className="mt-6">
        <AdminProductForm />
      </div>
    </div>
  );
}
