import { Router } from "express";
import { addressController } from "../controller/user/address.controller";

const router: Router = Router();

router.post("/address", addressController);

export default router;
