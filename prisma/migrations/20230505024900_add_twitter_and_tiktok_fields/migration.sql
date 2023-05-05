/*
  Warnings:

  - You are about to drop the `social` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "social" DROP CONSTRAINT "social_userId_fkey";

-- DropTable
DROP TABLE "social";

-- CreateTable
CREATE TABLE "socials" (
    "id" TEXT NOT NULL,
    "website" TEXT,
    "twitter" TEXT,
    "github" TEXT,
    "twitch" TEXT,
    "youtube" TEXT,
    "tiktok" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "socials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "socials_userId_key" ON "socials"("userId");

-- AddForeignKey
ALTER TABLE "socials" ADD CONSTRAINT "socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
