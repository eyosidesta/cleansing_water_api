-- CreateTable
CREATE TABLE "Testimony" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "contentRaw" TEXT NOT NULL,
    "authorName" TEXT NOT NULL DEFAULT 'Cleansing Water Ministry',
    "coverImageUrl" TEXT,
    "galleryImageUrls" TEXT[],
    "publishedAt" TIMESTAMP(3),
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimony_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Testimony_publishedAt_idx" ON "Testimony"("publishedAt");

-- CreateIndex
CREATE INDEX "Testimony_createdById_idx" ON "Testimony"("createdById");

-- AddForeignKey
ALTER TABLE "Testimony" ADD CONSTRAINT "Testimony_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
