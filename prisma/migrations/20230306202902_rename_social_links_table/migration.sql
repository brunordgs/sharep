/*
  Warnings:

  - You are about to drop the `social_links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "social_links" DROP CONSTRAINT "social_links_userId_fkey";

-- DropTable
DROP TABLE "social_links";

-- CreateTable
CREATE TABLE "social" (
    "id" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "twitch" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "social_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "social_userId_key" ON "social"("userId");

-- AddForeignKey
ALTER TABLE "social" ADD CONSTRAINT "social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
