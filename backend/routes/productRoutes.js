import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updatedProduct,
  giveReview,
  getBestRatedProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//CLEANER WAY IS WE IMPORT ALL THE ROUTES FROM A CONTROLLER FILE WHERE ALL THE ROUTES ARE DEFINED

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, giveReview);
router.get("/top", getBestRatedProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updatedProduct);

export default router;
