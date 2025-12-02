import { Router } from "express";
import Address from "./user-address.route";
const router: Router = Router();

router.use(Address);

export default router;
