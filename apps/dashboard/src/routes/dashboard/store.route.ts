import { Router } from "express";
import {
  createStoreController,
  deleteStoreController,
  getStoreController,
  updateStoreController,
} from "../../controllers/dashboard/store/store.controller";
import { addressController, updateAddressController } from "../../controllers/dashboard/store/address.controller";

const router: Router = Router();

router.get("/store", getStoreController);
router.post("/store", createStoreController);
router.patch("/store/:id", updateStoreController);
router.delete("/store/:id", deleteStoreController);


router.post("/address", addressController);
router.patch("/address/:id", updateAddressController);


export default router;
