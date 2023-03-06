-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "isCreator" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "social_links" (
    "id" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "twitch" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
