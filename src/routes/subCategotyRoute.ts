import { Router } from "express";
const router = Router();
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategory,
  getAllSubCategoryByCategoryId,
  getSubCategory,
  updateSubCategory,
} from "../controllers/subCategoryController";

import { authenticateToken } from "../middlewares/verifyJWT";

router.post("/create_subcategory", authenticateToken, createSubCategory);
router.get("/get_all_subcategory", getAllSubCategory);
router.get("/get_subcategory/:subCategoryId", getSubCategory);
router.get(
  "/get_subcategory-by-category-id/:categoryId",
  getAllSubCategoryByCategoryId
);
router.put(
  "/edit_subcategory/:subCategoryId",
  authenticateToken,
  updateSubCategory
);
router.delete(
  "/delete_subcategory/:subCategoryId",
  authenticateToken,
  deleteSubCategory
);

export default router;
