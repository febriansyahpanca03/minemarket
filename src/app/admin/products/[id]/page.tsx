import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminProductForm from "@/components/admin-product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit Product</h1>
      <p className="mt-1 text-sm text-slate-400">{product.name}</p>

      <div className="mt-6">
        <AdminProductForm
          productId={product.id}
          initialValues={{
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: String(product.price),
            discountPrice: product.discountPrice ? String(product.discountPrice) : "",
            stock: String(product.stock),
            imageUrl: product.imageUrl ?? "",
            type: product.type,
            isActive: product.isActive,
            categoryId: product.categoryId,
          }}
        />
      </div>
    </div>
  );
}
