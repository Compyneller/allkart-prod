import { Router } from "express";
import Category from "./category.route";
import Store from "./store.route";
const router: Router = Router();

router.use(Category);
router.use(Store);

export default router;
