
export interface IRecommendation {
  songId: number;
  score: number;
}

export interface ISong {
  id: number;
  genre: { name: string };
  artist: { name: string };
  label: 'perfect_match' | 'good_match' | null;
}