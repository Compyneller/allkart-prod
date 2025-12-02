import { Router } from "express";
import { getProductRelatedToCategoryController } from "../../controllers/all-products.controller";
import { getCategoriesWithProductsController } from "../../controllers/cat-products.controller";
import {
  createProductController,
  deleteProductController,
  getProductsController,
  productDetailController,
  updateProductController,
} from "../../controllers/product.controller";

const router: Router = Router();

router.post("/create-product", createProductController);
router.get("/products", getProductsController);
router.get("/products/:id", getProductRelatedToCategoryController);
router.patch("/product/:id", updateProductController);
router.get("/product/:productId/:variantId", productDetailController);
router.delete("/delete-product/:productId", deleteProductController);
router.get("/all-products", getCategoriesWithProductsController);

export default router;
