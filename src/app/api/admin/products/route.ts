import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session";

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(1),
  price: z.number().int().positive(),
  discountPrice: z.number().int().positive().nullable().optional(),
  stock: z.number().int().min(0),
  imageUrl: z.string().url().nullable().optional(),
  type: z.enum(["ACCOUNT", "DIAMOND", "MINECOIN", "BUNDLE", "OTHER"]),
  isActive: z.boolean().optional(),
  categoryId: z.string().min(1),
});

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Data tidak valid", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const existing = await prisma.product.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 400 });
  }

  const product = await prisma.product.create({ data: parsed.data });

  return NextResponse.json({ product }, { status: 201 });
}
