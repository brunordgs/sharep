/*
  Warnings:

  - You are about to drop the column `source` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "source",
DROP COLUMN "title",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "sourceName" TEXT,
ADD COLUMN     "sourceUrl" TEXT;
