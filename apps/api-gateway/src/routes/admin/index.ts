import { Router } from "express";
import User from "./user.route";
import Category from "./category.route";
import Store from "./store.route";
import SellerDocuments from "./seller-doc.route";

const router: Router = Router();

router.use("/dashboard/admin", User);
router.use("/dashboard/admin", Store);
router.use("/dashboard/admin", Category);
router.use("/dashboard/admin", SellerDocuments);

export default router;
