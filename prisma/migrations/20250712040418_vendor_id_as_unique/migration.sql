/*
  Warnings:

  - A unique constraint covering the columns `[vendorId]` on the table `Catalog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Catalog_vendorId_key" ON "Catalog"("vendorId");
