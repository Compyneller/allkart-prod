import { Router } from "express";
import { checkAdmin } from "../middleware/admin.middleware";
import { checkAuth } from "../middleware/auth.middleware";
import { checkSeller } from "../middleware/dashboard.middleware";
import Admin from "./admin/index";
import Cart from "./cart.route";
import ChangeUserRole from "./change-user-role.route";
import Dashboard from "./dashboard/index";
import Everyone from "./everyone/index";
import Product from "./product.route";
import SellerDocuments from "./seller-documents.route";
import Upload from "./upload/index";
import User from "./user/index";
import Payment from './payment/payment.route'
import Auth from './auth/index'
const router: Router = Router();

router.use(Everyone);
router.use(Product);
router.use(checkAuth, Auth)
router.use(checkAuth, SellerDocuments);
router.use(checkAuth, User);
router.use(checkAuth, ChangeUserRole);
router.use(checkAuth, Payment);
router.use("/dashboard", checkSeller, Dashboard);
router.use(checkSeller, Upload);
router.use(checkSeller, Cart);
router.use(checkAdmin, Admin);
// router.use(checkAdmin, Auth);

export default router;
