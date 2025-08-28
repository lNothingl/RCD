import {NextFunction, Request, Response} from "express";
import { prisma } from '@src/db/index.js';
import {IRecommendation} from "@src/types/response.js";
import { faker } from '@faker-js/faker';

class ExternalRecommendationsController {
  async list(_req: Request, res: Response, _next: NextFunction) {
    const list: IRecommendation[] = [];
    const songs = await prisma.song.findMany({
      select: {
        id: true,
      }
    });

    for (const songSlice of faker.helpers.shuffle(songs).slice(0, 10)) {
      list.push({
        songId: songSlice.id,
        score: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
      })
    }

    res.json(list);
  }
}

export default new ExternalRecommendationsController();