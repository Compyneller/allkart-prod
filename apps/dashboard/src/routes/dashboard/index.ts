import { Router } from "express";
import Store from "./store.route";
import Variants from "./variants.route";

const router: Router = Router();

router.use(Store);
router.use(Variants);

export default router;
