import { Router } from "express";
import {
  deleteAllImagesController,
  deleteImageController,
} from "../../controllers/upload/delete-image.controller";

const router: Router = Router();

router.post("/delete-image", deleteImageController);
router.post("/delete-all-image", deleteAllImagesController);

export default router;
