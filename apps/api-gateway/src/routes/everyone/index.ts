import { Router } from "express";
import Category from './category.route'
import GetStores from './near-by-stores.route'
const router: Router = Router();

router.use(Category);
router.use(GetStores)

export default router;
