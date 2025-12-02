import { Router } from "express";
import { getCategoriesController } from "../../controllers/everyone/category.controller";


const router: Router = Router();

router.get("/category", getCategoriesController);

export default router;
