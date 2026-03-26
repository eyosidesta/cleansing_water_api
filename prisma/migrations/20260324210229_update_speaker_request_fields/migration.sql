/*
  Warnings:

  - You are about to drop the column `expectedAttendance` on the `SpeakerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `intendedHonorarium` on the `SpeakerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `speakingTimes` on the `SpeakerRequest` table. All the data in the column will be lost.
  - Added the required column `speakingDuration` to the `SpeakerRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpeakerRequest" DROP COLUMN "expectedAttendance",
DROP COLUMN "intendedHonorarium",
DROP COLUMN "speakingTimes",
ADD COLUMN     "speakingDuration" TEXT NOT NULL;
