import { Router } from "express";
import { getNearByStoreController } from "../../controllers/everyone/near-by-store.controller";


const router: Router = Router();

router.get("/get-stores", getNearByStoreController);

export default router;
