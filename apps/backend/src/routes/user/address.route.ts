import { Router } from "express";
import {
  addressController,
  deleteAddressController,
  getAddressController,
  updateAddressController,
} from "../../controller/user/address.controller";

const router: Router = Router();

router.post("/address", addressController);
router.get("/address", getAddressController);
router.delete("/address/:id", deleteAddressController);
router.patch("/address/:id", updateAddressController);

export default router;
