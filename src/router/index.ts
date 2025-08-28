import {Router} from "express";
import external from "@src/router/external-recommendations/index.js";
import favourites from "@src/router/user-favourites/index.js";

const router = Router();

router.use("/external-recommendations", external);
router.use("/user-favourites", favourites);
export default router;