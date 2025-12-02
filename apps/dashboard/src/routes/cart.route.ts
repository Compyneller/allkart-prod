import { Router } from "express";
import {
  AddToCartController,
  DecrementCartController,
  getCartController,
} from "../controllers/cart.controller";

const router: Router = Router();

router.post("/cart", AddToCartController);
router.get("/cart", getCartController);
router.post("/decrement-cart", DecrementCartController);



export default router;
