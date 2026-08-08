import e from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const router = e.Router();

router.route("/").post(createProduct).get(getProducts);
router.route("/:id").patch(updateProduct).delete(deleteProduct).get(getProduct);
export default router;
