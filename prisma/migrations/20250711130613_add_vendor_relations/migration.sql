/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Vendors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Vendors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vendors" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vendors_userId_key" ON "Vendors"("userId");

-- AddForeignKey
ALTER TABLE "Vendors" ADD CONSTRAINT "Vendors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
