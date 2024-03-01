import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


async function main() {
  const category = await prisma.category.create({
    data: {
      categorySlug: 'bags',
      categoryName: 'Bags',
      categoryImagePath: 'images/categories/bags.png',
    },
  });

  await prisma.product.create({
    data: {
      productSlug: 'bag-1',
      categoryID: category.categoryID,
      productName: 'Bag 1',
      productPrice: 299.99,
      productInventory: 50,
      productDescription: 'A high-quality bag.',
      productImagePath: 'images/products/bag1.png',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });