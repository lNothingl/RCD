import { prisma } from '@src/db/index.js';
import { IRecommendation } from '@src/types/response.js';

class SongsService {

  async getFavouritesSongs(externalRecs : IRecommendation[]) {

    const songIds = externalRecs.map(rec => rec.songId);

    const chunkSize = 100;
    const songChunks = [];
    for (let i = 0; i < songIds.length; i += chunkSize) {
      songChunks.push(songIds.slice(i, i + chunkSize));
    }

    let songs = [];
    for (const chunk of songChunks) {
      const chunkSongs = await prisma.song.findMany({
        where: { id: { in: chunk } },
        include: {
          artist: true,
          genre: true,
        },
      });
      songs = songs.concat(chunkSongs);
    }

    if (songs.length === 0) {
      return [];
    }

    return songs;
  }
}

export default new SongsService();