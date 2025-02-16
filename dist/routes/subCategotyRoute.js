"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const subCategoryController_1 = require("../controllers/subCategoryController");
const verifyJWT_1 = require("../middlewares/verifyJWT");
const aws_1 = __importDefault(require("../config/aws"));
router.post("/create_subcategory", aws_1.default.fields([
    { name: "imageUrl", maxCount: 1 }, // Single file
]), subCategoryController_1.createSubCategory);
router.get("/get_all_subcategories", subCategoryController_1.getAllSubCategory);
router.get("/get_subcategory/:subCategoryId", subCategoryController_1.getSubCategory);
router.get("/get_subcategory_by_category_id/:categoryId", subCategoryController_1.getAllSubCategoryByCategoryId);
router.put("/edit_subcategory/:subCategoryId", verifyJWT_1.authenticateToken, subCategoryController_1.updateSubCategory);
router.delete("/delete_subcategory/:subCategoryId", verifyJWT_1.authenticateToken, subCategoryController_1.deleteSubCategory);
exports.default = router;
