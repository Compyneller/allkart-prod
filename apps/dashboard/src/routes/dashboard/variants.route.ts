import { Router } from "express";
import {
  createVariantController,
  deleteVariantController,
  getVariantsController,
  updateVariantController,
} from "../../controllers/dashboard/variants.controller";

const router: Router = Router();

router.get("/variants/:pid", getVariantsController);
router.delete("/variant/:vid", deleteVariantController);
router.post("/variant", createVariantController);
router.patch("/variant/:vid", updateVariantController);

export default router;
