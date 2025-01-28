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
exports.createCategory = createCategory;
exports.getAllCategories = getAllCategories;
exports.getCategory = getCategory;
exports.fetchCategoryByMainCategoryId = fetchCategoryByMainCategoryId;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
const category_model_1 = __importDefault(require("../models/category.model"));
function createCategory(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, imageUrl, categorySlug, status, mainCategoryId } = request.body;
        if (!name)
            return response.status(200).json({
                error: true,
                message: "Please provide a category name",
            });
        if (!description)
            return response.status(200).json({
                error: true,
                message: "Please provide category description",
            });
        if (!imageUrl)
            return response.status(200).json({
                error: true,
                message: "Please provide category images",
            });
        if (!mainCategoryId)
            return response.status(200).json({
                error: true,
                message: "Please provide main category id",
            });
        try {
            const category = yield category_model_1.default.create({
                name,
                description,
                imageUrl,
                categorySlug,
                status,
                mainCategoryId,
            });
            response.status(200).json({
                error: false,
                category,
                message: "new category created successfully",
            });
        }
        catch (err) {
            return response.status(500).json({
                error: true,
                err,
                message: "Internal server error, Please try again",
            });
        }
    });
}
function getAllCategories(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield category_model_1.default.find();
            response.status(200).json({
                error: false,
                categories,
            });
        }
        catch (err) {
            return response.status(500).json({
                error: true,
                err,
                message: "Internal server error, Please try again",
            });
        }
    });
}
function getCategory(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const category = yield category_model_1.default.findById(id);
            if (!category) {
                return response.status(404).json({
                    error: true,
                    message: "Category not found",
                });
            }
            response.status(200).json({
                error: false,
                category,
            });
        }
        catch (err) {
            return response.status(500).json({
                error: true,
                err,
                message: "Internal server error, Please try again",
            });
        }
    });
}
function fetchCategoryByMainCategoryId(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { mainCategoryId } = request.params;
        try {
            const category = yield category_model_1.default.find({ mainCategoryId });
            if (!category) {
                return response.status(404).json({
                    error: true,
                    message: "Category not found",
                });
            }
            response.status(200).json({
                error: false,
                category,
            });
        }
        catch (err) {
            return response.status(500).json({
                error: true,
                err,
                message: "Internal server error, Please try again",
            });
        }
    });
}
function updateCategory(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        const { name, description, imageUrl, categorySlug, status, mainCategoryId } = request.body;
        try {
            const category = yield category_model_1.default.findByIdAndUpdate(id, { name, description, imageUrl, categorySlug, status, mainCategoryId }, { new: true });
            if (!category) {
                return response.status(404).json({
                    error: true,
                    message: "Category not found",
                });
            }
            response.status(200).json({
                error: false,
                category,
                message: "Category updated successfully",
            });
        }
        catch (err) {
            return response.status(500).json({
                error: true,
                err,
                message: "Internal server error, Please try again",
            });
        }
    });
}
function deleteCategory(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const category = yield category_model_1.default.findByIdAndDelete(id);
            if (!category) {
                return response.status(404).json({
                    error: true,
                    message: "Category not found",
                });
            }
            response.status(200).json({
                error: false,
                message: "Category deleted successfully",
            });
        }
        catch (err) {
            return response.status(500).json({
                error: true,
                err,
                message: "Internal server error, Please try again",
            });
        }
    });
}
