import { Router } from "express";
import { getSellerDocController } from "../../controllers/admin/seller-doc.controller";

const router: Router = Router();

router.get("/seller-documents/:id", getSellerDocController);

export default router;
