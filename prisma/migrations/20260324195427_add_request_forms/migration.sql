-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('NEW', 'IN_REVIEW', 'FOLLOW_UP', 'ACCEPTED', 'DECLINED');

-- CreateEnum
CREATE TYPE "InterviewMediaType" AS ENUM ('TELEVISION', 'RADIO', 'PRINT', 'PODCAST', 'ONLINE_VIDEO', 'ONLINE_ARTICLE', 'OTHER');

-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('LIVE', 'RECORDED');

-- CreateTable
CREATE TABLE "InterviewRequest" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "organizationWebsite" TEXT,
    "phone" TEXT NOT NULL,
    "interviewerName" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "mediaType" "InterviewMediaType" NOT NULL,
    "interviewType" "InterviewType" NOT NULL,
    "requestedDate" TIMESTAMP(3) NOT NULL,
    "alternateDate" TIMESTAMP(3),
    "primaryTopic" TEXT,
    "additionalInformation" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'NEW',
    "adminNotes" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeakerRequest" (
    "id" SERIAL NOT NULL,
    "organizationName" TEXT NOT NULL,
    "organizationWebsite" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "alternateDate" TIMESTAMP(3),
    "venueName" TEXT NOT NULL,
    "locationAddress" TEXT NOT NULL,
    "locationCity" TEXT NOT NULL,
    "locationState" TEXT NOT NULL,
    "locationPostalCode" TEXT NOT NULL,
    "locationCountry" TEXT NOT NULL,
    "expectedAttendance" INTEGER NOT NULL,
    "speakingTimes" INTEGER NOT NULL,
    "intendedHonorarium" TEXT,
    "eventDescription" TEXT NOT NULL,
    "primaryTopic" TEXT,
    "additionalInformation" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'NEW',
    "adminNotes" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpeakerRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InterviewRequest_status_idx" ON "InterviewRequest"("status");

-- CreateIndex
CREATE INDEX "InterviewRequest_requestedDate_idx" ON "InterviewRequest"("requestedDate");

-- CreateIndex
CREATE INDEX "SpeakerRequest_status_idx" ON "SpeakerRequest"("status");

-- CreateIndex
CREATE INDEX "SpeakerRequest_eventDate_idx" ON "SpeakerRequest"("eventDate");
