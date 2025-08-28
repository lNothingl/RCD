import {NextFunction, Request, Response} from "express";
import UserFavouritesService from '@src/services/user-favourites/index.js';

class UserFavouritesController {

  async getListOfSongs(_req: Request, res: Response, _next: NextFunction) {
    const userId : number = Number(_req.query.userId);
    if(!userId)
      res.status(400).json({error: 'userId must be defined in query params', status: 400});

    const userFavouritesSongs = await UserFavouritesService.getListOfSongs(userId);
    if(!userFavouritesSongs)
      res.status(400).json({error: 'User not found', status: 400});

    res.json(userFavouritesSongs);
  }
}

export default new UserFavouritesController();