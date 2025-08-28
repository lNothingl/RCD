import Redis from 'ioredis';
import { REDIS_URL } from '@src/constants/index.js';
import * as process from 'process';
import * as console from 'console';

const client = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: 1,
});


export const checkRedisConnection = async (): Promise<boolean> => {
  try {
    await client.ping();
    console.log('Redis connection established successfully');
    return true;
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    await client.quit();
    return false;
  }
};

export default client;
