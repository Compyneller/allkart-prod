import { Router } from "express";
import emailVerificationRoute from "./onboarding.route";
const router: Router = Router();

router.use(emailVerificationRoute);

export default router;
