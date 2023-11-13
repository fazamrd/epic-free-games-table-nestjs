-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "game_name" TEXT NOT NULL,
    "game_url" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "meta_score" INTEGER,
    "user_score" INTEGER,
    "critic_reviews" INTEGER,
    "user_reviews" INTEGER,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);
