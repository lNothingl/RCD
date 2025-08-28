import {Router} from "express";
import ExternalRecommendationsController from '@src/controllers/external-recommendations/index.js';

const router = Router();


router.get("/", ExternalRecommendationsController.list)

export default router;