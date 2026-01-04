import { Router } from "express";
import Category from './category.route'
import GetStores from './near-by-store.route'
import StoreProducts from './store-products.route'
import StoreDetail from './store-detail.route'
const router: Router = Router();

router.use(Category);
router.use(GetStores)
router.use(StoreProducts)
router.use(StoreDetail)

export default router;
