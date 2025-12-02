import { Router } from "express";
import GenerateSignature from "./generate-signature.route";
import DeleteImage from "./delete-image.route";
const router: Router = Router();

router.use(GenerateSignature);
router.use(DeleteImage);

export default router;
