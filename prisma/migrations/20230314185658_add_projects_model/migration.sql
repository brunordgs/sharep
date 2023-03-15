/*
  Warnings:

  - You are about to drop the column `username` on the `creators` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "creators" DROP COLUMN "username";

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
