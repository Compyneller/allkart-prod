import { Router } from "express";
import { emailVerificationController } from "../controller/onboarding/email-verification.controller";

const router: Router = Router();

router.use("/email-verification", emailVerificationController);

export default router;
