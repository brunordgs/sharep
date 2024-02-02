/*
  Warnings:

  - You are about to drop the column `sourceName` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `sourceUrl` on the `projects` table. All the data in the column will be lost.
  - Added the required column `repo` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repoUrl` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "sourceName",
DROP COLUMN "sourceUrl",
ADD COLUMN     "repo" TEXT NOT NULL,
ADD COLUMN     "repoUrl" TEXT NOT NULL;
