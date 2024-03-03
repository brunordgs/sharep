-- CreateTable
CREATE TABLE "team_members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "socials" JSONB NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);
