import { Router } from "express";
import Variants from "./variants.route";
import Bank from "./bank.route";
const router: Router = Router();

router.use(Variants);
router.use(Bank)

export default router;
