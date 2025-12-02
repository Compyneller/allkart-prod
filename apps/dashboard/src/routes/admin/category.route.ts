import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController
} from "../../controllers/admin/category.controller";

const router: Router = Router();

router.post("/category", createCategoryController);
router.delete("/category/:id", deleteCategoryController);

export default router;
