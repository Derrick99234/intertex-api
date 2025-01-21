import { Router } from "express";
import {
  createProducts,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productsController";
const router = Router();

router.post("/create-products", createProducts);
router.get("/get-product/:id", getProductById);
router.get("/get-all-products", getProducts);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
