import { Router } from "express";
import Users from "./users.route";
import SellerDocuments from "./seller-doc.route";
const router: Router = Router();

router.use(Users);
router.use(SellerDocuments);

export default router;
