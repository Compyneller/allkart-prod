import { Router } from "express";
import Category from "./category.route";
import Store from "./store.route";
import SellerDoc from "./seller-doc.route";
const router: Router = Router();

router.use(Category);
router.use(Store);
router.use(SellerDoc);

export default router;
