-- AlterTable
ALTER TABLE "Podcast" ADD COLUMN     "seriesId" INTEGER;

-- CreateTable
CREATE TABLE "PodcastSeries" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PodcastSeries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PodcastSeries_slug_key" ON "PodcastSeries"("slug");

-- CreateIndex
CREATE INDEX "Podcast_seriesId_idx" ON "Podcast"("seriesId");

-- AddForeignKey
ALTER TABLE "Podcast" ADD CONSTRAINT "Podcast_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "PodcastSeries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
