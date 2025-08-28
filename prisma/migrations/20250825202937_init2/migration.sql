/*
  Warnings:

  - You are about to drop the column `genreId` on the `Song` table. All the data in the column will be lost.
  - Added the required column `artist_id` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre_id` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_genreId_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "genreId",
ADD COLUMN     "artist_id" INTEGER NOT NULL,
ADD COLUMN     "genre_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "artists" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
