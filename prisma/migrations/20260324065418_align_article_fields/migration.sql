/*
  Warnings:

  - You are about to drop the column `description` on the `Article` table. All the data in the column will be lost.
  - Added the required column `excerpt` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "description",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'General',
ADD COLUMN     "excerpt" TEXT NOT NULL,
ADD COLUMN     "readTime" INTEGER;

-- CreateIndex
CREATE INDEX "Article_category_idx" ON "Article"("category");
