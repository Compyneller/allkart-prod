import { Router } from "express";
import { getHomeFeedHandler } from "../../controllers/everyone/feed.controller";


const router: Router = Router();

router.get("/get-stores", getHomeFeedHandler);

export default router;
