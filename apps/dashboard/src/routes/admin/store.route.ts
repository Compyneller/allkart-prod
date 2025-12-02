import { Router } from "express";
import { getStoreController } from "../../controllers/admin/store.controller";

const router: Router = Router();

router.get("/store/:id", getStoreController);

export default router;
