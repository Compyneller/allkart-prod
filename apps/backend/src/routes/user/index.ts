import { Router } from "express";
import Address from "./address.route";
const router: Router = Router();

router.use(Address);

export default router;
