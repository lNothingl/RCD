import { prisma } from '@src/db/index.js';
import {IRecommendation} from "@src/types/response.js";
import { ISong } from '@src/types/response';
import ExternalRecommendationsService from '@src/services/external-recommendations/index.js';
import SongsService from '@src/services/songs/index.js';

class UserFavouritesService {

  async getFavouritesSongs(userId : number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { favoriteGenres: true },
    });

    if (!user) {
      return null;
    }

    return  user.favoriteGenres.map(genre => genre.id);
  }
  async getListOfSongs(userId : number) : Promise<ISong[] | null> {
    const externalRecs: IRecommendation[] = await ExternalRecommendationsService.getRecommendations(userId);
    const userFavoriteGenreIds = await this.getFavouritesSongs(userId);
    if(!userFavoriteGenreIds)
      return null;
    let songs = await SongsService.getFavouritesSongs(externalRecs);

    const recommendationsMap = new Map(
      externalRecs.map(rec => [rec.songId, rec.score])
    );

    const songsWithScores = songs.map(song => {
      const score = recommendationsMap.get(song.id) || 0;
      const isFavoriteGenre = userFavoriteGenreIds.includes(song.genre.id);

      let label: 'perfect_match' | 'good_match' | null = null;

      if (isFavoriteGenre && score > 0.6) {
        label = 'perfect_match';
      } else if (isFavoriteGenre || score > 0.6) {
        label = 'good_match';
      }

      return {
        id: song.id,
        title: song.title,
        artist: song.artist.name,
        genre: song.genre.name,
        label: label,
        score: score,
      };
    });

    songsWithScores.sort((a, b) => b.score - a.score);

    const recommendedSongs: ISong[] = songsWithScores.map(song => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      genre: song.genre,
      label: song.label,
    }));

    return recommendedSongs;
  }
}

export default new UserFavouritesService();