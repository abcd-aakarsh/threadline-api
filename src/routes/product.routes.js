import e from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
const router = e.Router();

router
  .route("/")
  .post(protect, restrictTo("admin"), createProduct)
  .get(getProducts);
router
  .route("/:id")
  .patch(protect, restrictTo("admin"), updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct)
  .get(getProduct);
export default router;
