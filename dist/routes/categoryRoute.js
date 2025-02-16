"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const aws_1 = __importDefault(require("../config/aws"));
const router = (0, express_1.Router)();
router.post("/create-category", aws_1.default.fields([
    { name: "imageUrl", maxCount: 1 }, // Single file
]), categoryController_1.createCategory);
router.get("/get-category/:id", categoryController_1.getCategory);
router.get("/get-all-categories", categoryController_1.getAllCategories);
router.get("/get-all-categories-by-main-category/:mainCategoryId", categoryController_1.fetchCategoryByMainCategoryId);
router.put("/update-category/:id", categoryController_1.updateCategory);
router.delete("/delete-category/:id", categoryController_1.deleteCategory);
exports.default = router;
