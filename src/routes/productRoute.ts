import { Router } from "express";
import {
  createProducts,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productsController";
import upload from "../config/aws";
const router = Router();

router.post(
  "/create-products",
  upload.fields([
    { name: "productImage", maxCount: 1 }, // Single file
    { name: "otherImages", maxCount: 5 }, // Multiple files (max 5)
  ]),
  createProducts
);
router.get("/get-product/:id", getProductById);
router.get("/get-all-products", getProducts);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
