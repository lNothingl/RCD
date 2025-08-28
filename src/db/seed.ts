import { prisma } from '@src/db/index.js';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

const seedGenres = async () => {
  const dataSet: Prisma.GenreCreateInput[] = [];
  while(dataSet.length < 50) {
    dataSet.push({
      name: faker.music.genre(),
    })
  }
  await prisma.genre.createMany({
    data: dataSet,
  })
}

const seedArtists = async () => {
  const dataSet: Prisma.ArtistCreateInput[] = [];
  while(dataSet.length < 10) {
    dataSet.push({
      name: faker.music.artist(),
    })
  }
  await prisma.artist.createMany({data: dataSet})
}

const seedSongs = async () => {
  const dataSet: Prisma.SongCreateManyInput[] = [];
  const artists = await prisma.artist.findMany();
  const genres = await prisma.genre.findMany();
  while(dataSet.length < 50) {
    dataSet.push({
      name: faker.music.songName(),
      genreId: faker.helpers.shuffle(genres).at(0)!.id,
      artistId: faker.helpers.shuffle(artists).at(0)!.id,
    })
  }
  await prisma.song.createMany({
    data: dataSet,
  })
}

const seedUsers = async () => {
  const genreIds = (await prisma.genre.findMany()).map(genre => genre.id);
  const dataSet: Prisma.UserCreateInput[] = [];
  while(dataSet.length < 50) {
    const numberOfGenres = faker.number.int({ min: 0, max: 5 });
    // Перемешиваем массив id жанров и берем первые numberOfGenres элементов
    const randomGenreIds = faker.helpers.shuffle([...genreIds]).slice(0, numberOfGenres);
    dataSet.push({
      fullName: faker.person.fullName(),
      favoriteGenres: {
        createMany: {
          data: randomGenreIds.map(genreId => ({ genreId })),
        }
      }
    })
  }
  for (const user of dataSet) {
    await prisma.user.create({
      data: user,
    })
  }
}

async function main() {
  await seedGenres();
  await seedUsers();
  await seedArtists();
  await seedSongs();
}

main();