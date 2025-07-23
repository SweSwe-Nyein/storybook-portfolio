-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "tag" TEXT;

-- AlterTable
ALTER TABLE "SkillCategory" ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "linkedInUrl" TEXT,
ADD COLUMN     "overview" TEXT;
