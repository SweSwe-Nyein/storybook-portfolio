-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "description" TEXT NOT NULL,
    "technologies" TEXT[],
    "companyUrl" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);
