import express from "express";
import { authenticateToken } from "../middlewares/verifyJWT";
import {
  createMainCategory,
  deleteMainCategory,
  getMainCategories,
  getMainCategoryById,
  updateMainCategory,
} from "../controllers/mainCategoryController";
import upload from "../config/aws";

const router = express.Router();
// Login route

router.post(
  "/create-main-category",
  upload.fields([
    { name: "imageUrl", maxCount: 1 }, // Single file
  ]),
  createMainCategory
);
router.get("/get-main-category/:id", getMainCategoryById);
router.get("/get-all-main-categories", getMainCategories);
router.put("/update-main-category/:id", updateMainCategory);
router.delete("/delete-main-category/:id", deleteMainCategory);

export default router;
