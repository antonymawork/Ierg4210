-- CreateTable
CREATE TABLE "Category" (
    "categoryID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categorySlug" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryImagePath" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "productID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productSlug" TEXT NOT NULL,
    "categoryID" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "productPrice" REAL NOT NULL,
    "productInventory" INTEGER NOT NULL,
    "productDescription" TEXT NOT NULL,
    "productImagePath" TEXT NOT NULL,
    CONSTRAINT "Product_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category" ("categoryID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_categorySlug_key" ON "Category"("categorySlug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productSlug_key" ON "Product"("productSlug");
