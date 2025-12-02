import { Router } from "express";
import { sellerDocumentController } from "../controller/seller-document.controller";

const router: Router = Router();

router.post("/seller-documents", sellerDocumentController);

export default router;
