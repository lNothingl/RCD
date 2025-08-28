import {Router} from "express";
import UserFavouritesController from '@src/controllers/user-favourites/index.js';

const router = Router();


router.get("/", UserFavouritesController.getListOfSongs)

export default router;