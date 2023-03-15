/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `social_links` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "social_links_userId_key" ON "social_links"("userId");
