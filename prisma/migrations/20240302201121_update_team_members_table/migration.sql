/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `team_members` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `team_members` table. All the data in the column will be lost.
  - Added the required column `userId` to the `team_members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team_members" DROP COLUMN "imageUrl",
DROP COLUMN "name",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
