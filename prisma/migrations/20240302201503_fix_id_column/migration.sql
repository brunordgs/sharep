/*
  Warnings:

  - The primary key for the `team_members` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "team_members_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "team_members_id_seq";
