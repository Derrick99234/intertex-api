import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  fetchCategoryByMainCategoryId,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController";
import { authenticateToken } from "../middlewares/verifyJWT";

const router = Router();

router.post("/create-category", authenticateToken, createCategory);
router.get("/get-category/:id", getCategory);
router.get("/get-all-categories", getAllCategories);
router.get(
  "/get-all-categories-by-main-category/:mainCategoryId",
  fetchCategoryByMainCategoryId
);
router.put("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);

export default router;
