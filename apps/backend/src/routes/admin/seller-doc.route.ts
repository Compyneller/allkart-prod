import { Router } from "express";
import { getSellerDocController } from "../../controller/admin/seller-doc.controller";

const router: Router = Router();

router.get("/seller-documents", getSellerDocController);

export default router;
