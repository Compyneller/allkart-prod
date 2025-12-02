import { Router } from "express";
import Store from "./store.route";
import Variants from "./variants.route";
import Bank from "./bank.route";
const router: Router = Router();

router.use(Store);
router.use(Variants);
router.use(Bank)

export default router;
