import { Router } from "express";
import { generateUploadSignatureController } from "../../controllers/upload/generate-signature.controller";

const router: Router = Router();

router.get("/get-upload-signature", generateUploadSignatureController);

export default router;
