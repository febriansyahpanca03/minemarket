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
      { name: "Minecraft Accounts", slug: "minecraft-accounts" },
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

  const [accounts, minecoin, diamond, bundle] = categories;

  const products = [
    {
      name: "Minecraft Java & Bedrock Edition Account",
      slug: "minecraft-java-bedrock-account",
      description: "Original Minecraft Java + Bedrock account, full access, replacement guarantee.",
      price: 150000,
      discountPrice: 129000,
      stock: 25,
      type: ProductType.ACCOUNT,
      categoryId: accounts.id,
      imageUrl: "https://picsum.photos/seed/minestack-java-bedrock-account/800/800",
    },
    {
      name: "Minecoin 1720",
      slug: "minecoin-1720",
      description: "1720 Minecoin top up for Minecraft Bedrock Edition, instant delivery.",
      price: 219000,
      discountPrice: null,
      stock: 50,
      type: ProductType.MINECOIN,
      categoryId: minecoin.id,
      imageUrl: "https://picsum.photos/seed/minestack-minecoin-1720/800/800",
    },
    {
      name: "Minecoin 320",
      slug: "minecoin-320",
      description: "320 Minecoin top up for Minecraft Bedrock Edition, instant delivery.",
      price: 45000,
      discountPrice: 39000,
      stock: 80,
      type: ProductType.MINECOIN,
      categoryId: minecoin.id,
      imageUrl: "https://picsum.photos/seed/minestack-minecoin-320/800/800",
    },
    {
      name: "Autumn Bundle - Account + Custom Skin",
      slug: "autumn-bundle-account-custom-skin",
      description: "Minecraft Java & Bedrock account bundle plus an exclusive autumn custom skin.",
      price: 249999,
      discountPrice: 228999,
      stock: 15,
      type: ProductType.BUNDLE,
      categoryId: bundle.id,
      imageUrl: "https://picsum.photos/seed/minestack-autumn-bundle/800/800",
    },
    {
      name: "Diamond 500",
      slug: "diamond-500",
      description: "500 Diamond top up for your favorite Minecraft servers.",
      price: 75000,
      discountPrice: null,
      stock: 40,
      type: ProductType.DIAMOND,
      categoryId: diamond.id,
      imageUrl: "https://picsum.photos/seed/minestack-diamond-500/800/800",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
