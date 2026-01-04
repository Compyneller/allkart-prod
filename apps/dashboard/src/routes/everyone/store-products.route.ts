import { Router } from "express";
import { storeProductsController } from "../../controllers/everyone/store-products.controller";


const router: Router = Router();

router.get("/store-products/:id", storeProductsController);

export default router;
