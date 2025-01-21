import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController";
import { authenticateToken } from "../middlewares/verifyJWT";

const router = Router();

router.post("/create-products", authenticateToken, createCategory);
router.get("/get-product/:id", getCategory);
router.get("/get-all-products", getAllCategories);
router.put("/update-product/:id", updateCategory);
router.delete("/delete-product/:id", deleteCategory);

export default router;
