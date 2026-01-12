import { Router } from "express";
import { getNearByStoreController } from "../../controllers/everyone/near-by-store.controller";
import { getHomeFeedHandler } from "../../controllers/everyone/feed.controller";


const router: Router = Router();

router.get("/get-stores", getHomeFeedHandler);

export default router;
