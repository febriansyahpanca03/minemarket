import { PrismaClient, ProductType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: { username: "admin", passwordHash: adminPasswordHash },
  });

  const categories = await Promise.all(
    [
      { name: "Akun Minecraft", slug: "akun-minecraft" },
      { name: "Minecoin", slug: "minecoin" },
      { name: "Diamond", slug: "diamond" },
      { name: "Bundle", slug: "bundle" },
    ].map((category) =>
      prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      })
    )
  );

  const [akun, minecoin, diamond, bundle] = categories;

  const products = [
    {
      name: "Akun Minecraft Java & Bedrock Edition",
      slug: "akun-minecraft-java-bedrock",
      description: "Akun Minecraft original Java + Bedrock, full akses, garansi replace.",
      price: 150000,
      discountPrice: 129000,
      stock: 25,
      type: ProductType.ACCOUNT,
      categoryId: akun.id,
      imageUrl: "https://picsum.photos/seed/minemarket-java-bedrock-account/800/800",
    },
    {
      name: "Minecoin 1720",
      slug: "minecoin-1720",
      description: "Top up 1720 Minecoin untuk Minecraft Bedrock Edition, proses instan.",
      price: 219000,
      discountPrice: null,
      stock: 50,
      type: ProductType.MINECOIN,
      categoryId: minecoin.id,
      imageUrl: "https://picsum.photos/seed/minemarket-minecoin-1720/800/800",
    },
    {
      name: "Minecoin 320",
      slug: "minecoin-320",
      description: "Top up 320 Minecoin untuk Minecraft Bedrock Edition, proses instan.",
      price: 45000,
      discountPrice: 39000,
      stock: 80,
      type: ProductType.MINECOIN,
      categoryId: minecoin.id,
      imageUrl: "https://picsum.photos/seed/minemarket-minecoin-320/800/800",
    },
    {
      name: "Autumn Bundle - Akun + Custom Skin",
      slug: "autumn-bundle-akun-custom-skin",
      description: "Paket akun Minecraft Java & Bedrock plus custom skin eksklusif musim gugur.",
      price: 249999,
      discountPrice: 228999,
      stock: 15,
      type: ProductType.BUNDLE,
      categoryId: bundle.id,
      imageUrl: "https://picsum.photos/seed/minemarket-autumn-bundle/800/800",
    },
    {
      name: "Diamond 500",
      slug: "diamond-500",
      description: "Top up 500 Diamond untuk server-server Minecraft favoritmu.",
      price: 75000,
      discountPrice: null,
      stock: 40,
      type: ProductType.DIAMOND,
      categoryId: diamond.id,
      imageUrl: "https://picsum.photos/seed/minemarket-diamond-500/800/800",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log("Seed selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
