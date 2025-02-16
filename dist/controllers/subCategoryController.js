"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategory = exports.getSubCategory = exports.getAllSubCategoryByCategoryId = exports.getAllSubCategory = exports.updateSubCategory = exports.createSubCategory = void 0;
const subCategory_model_1 = __importDefault(require("../models/subCategory.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
// Create SubCategories
const createSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, status, categoryId, categorySlug } = req.body;
    try {
        const category = yield category_model_1.default.findOne({ _id: categoryId });
        const imageUrl = req.files["imageUrl"][0].location;
        if (!category)
            return res.status(404).json({
                error: true,
                message: "Wrong category id provided",
            });
        const subCategory = yield subCategory_model_1.default.create({
            name,
            description,
            imageUrl,
            status,
            categorySlug,
            categoryId,
        });
        res.status(200).json({
            error: false,
            subCategory,
            message: "SubCategory created successfully",
        });
    }
    catch (err) {
        return res.status(500).json({
            error: true,
            err,
            message: "Internal server error, Please try again",
        });
    }
});
exports.createSubCategory = createSubCategory;
// Update subCategory
const updateSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subCategoryId } = req.params;
    const { name, description, imageUrl, status } = req.body;
    try {
        const subCategory = yield subCategory_model_1.default.findOne({ _id: subCategoryId });
        if (!subCategory) {
            return res.status(200).json({
                error: true,
                message: "subCategory not found, please try again with the correct ID",
            });
        }
        if (name)
            subCategory.name = name;
        if (description)
            subCategory.description = description;
        if (imageUrl)
            subCategory.imageUrl = imageUrl;
        subCategory.status = status;
        yield subCategory.save();
        return res.status(200).json({
            error: false,
            subCategory,
            message: "SubCategory updated successfully",
        });
    }
    catch (err) {
        return res.status(500).json({
            error: true,
            err,
            message: "Internal server error, Please try again",
        });
    }
});
exports.updateSubCategory = updateSubCategory;
const getAllSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategories = yield subCategory_model_1.default.find();
        res.status(200).json({
            error: false,
            subCategories,
            message: "All subcategories fetched successfully",
        });
    }
    catch (err) {
        return res.status(500).json({
            error: true,
            err,
            message: "Internal server error, please try again",
        });
    }
});
exports.getAllSubCategory = getAllSubCategory;
const getAllSubCategoryByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const subCategories = yield subCategory_model_1.default.find({ categoryId });
        res.status(200).json({
            error: false,
            subCategories,
            message: "All subcategories fetched successfully",
        });
    }
    catch (err) {
        return res.status(500).json({
            error: true,
            err,
            message: "Internal server error, please try again",
        });
    }
});
exports.getAllSubCategoryByCategoryId = getAllSubCategoryByCategoryId;
// Get sub category
const getSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subCategoryId } = req.params;
    try {
        const subCategory = yield subCategory_model_1.default.findOne({ _id: subCategoryId });
        if (!subCategory) {
            return res.status(200).json({
                error: true,
                message: "subCategory not found, please try again with the correct ID",
            });
        }
        return res.status(200).json({
            error: false,
            subCategory,
            message: "subCategory data fetched successfully",
        });
    }
    catch (err) {
        return res.status(500).json({
            error: true,
            err,
            message: "Internal server error, Please try again",
        });
    }
});
exports.getSubCategory = getSubCategory;
// delete subCategory
const deleteSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subCategoryId } = req.params;
    try {
        const subCategory = yield subCategory_model_1.default.deleteOne({ _id: subCategoryId });
        if (!subCategory) {
            return res.status(404).json({
                error: true,
                message: "SubCategory not found",
            });
        }
        return res.json({
            error: false,
            message: "Subcategory deleted successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            error: true,
            err,
            message: "Internal server Error",
        });
    }
});
exports.deleteSubCategory = deleteSubCategory;
