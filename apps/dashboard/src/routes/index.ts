import { Router } from "express";
import Admin from "./admin/index";
import Cart from "./cart.route";
import Dashboard from './dashboard/index';
import Everyone from "./everyone/index";
import Payment from './payment/payment.route';
import Product from "./product/product.route";
import Upload from "./upload/index";
const router: Router = Router();

router.use(Dashboard);
router.use(Payment);
router.use("/admin", Admin);
router.use(Everyone);
router.use(Upload);
router.use(Product);
router.use(Cart);

export default router;
