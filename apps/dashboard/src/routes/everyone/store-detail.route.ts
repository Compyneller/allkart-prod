import { Router } from "express";
import { getStoreDetailController } from "../../controllers/everyone/store-detail.controller";


const router: Router = Router();

router.get("/store-detail/:id", getStoreDetailController);

export default router;
