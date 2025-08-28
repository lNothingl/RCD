import axios from 'axios';
import { IRecommendation } from '@src/types/response';
import * as process from 'process';
import * as console from 'console';
import client from '@src/redis.js';

export class ExternalRecommendationsService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.EXTERNAL_RECOMMENDATIONS_URL;
  }

  async getRecommendations(userId: number): Promise<IRecommendation[]> {
    const cacheKey = `external-recommendations:user:${userId}`;

    if(client.status == 'connecting') {
      try {
        const cachedData = await client.get(cacheKey);
        if (cachedData)
          return JSON.parse(cachedData);
      } catch (redisError) {
        console.error('Redis cache unavailable, fetching directly from API');
      }
    }
    try {
      const response = await axios.get(`${this.apiUrl}?user_id=${userId}`);
      const recommendations = response.data;

      if(client.status == 'connecting') {
        try {
          await client.setex(cacheKey, 86400, JSON.stringify(recommendations));
        } catch (cacheError) {
          console.error('Failed to cache recommendations, continuing without cache');
        }
      }

      return recommendations;
    } catch (error) {
      console.error('Error fetching external recommendations:', error);
      return [];
    }
  }
}
export default new ExternalRecommendationsService()