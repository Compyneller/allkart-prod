import { Router } from "express";
import { variantsController } from "../../controllers/everyone/variants.controller";


const router: Router = Router();

router.get("/variants", variantsController);

export default router;
