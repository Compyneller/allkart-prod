import { Router } from "express";
import address from "./address.route";
import Admin from "./admin/index";
import changeUserRole from "./change-user-role.route";
import sellerDocuments from "./seller-document.route";
import User from "./user/index";

const router: Router = Router();

router.use("/admin", Admin);
router.use("/user", User);
router.use(sellerDocuments);
router.use(address);
router.use(changeUserRole);

export default router;
