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
exports.deleteMainCategory = exports.updateMainCategory = exports.createMainCategory = exports.getMainCategoryById = exports.getMainCategories = void 0;
const mainCategory_model_1 = __importDefault(require("../models/mainCategory.model"));
// Get all main categories
const getMainCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield mainCategory_model_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json(categories);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error fetching main categories", error });
    }
});
exports.getMainCategories = getMainCategories;
// Get a single main category by ID
const getMainCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield mainCategory_model_1.default.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Main category not found" });
        }
        return res.status(200).json(category);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error fetching main category", error });
    }
});
exports.getMainCategoryById = getMainCategoryById;
// Create a new main category
const createMainCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = new mainCategory_model_1.default(req.body);
        const savedCategory = yield newCategory.save();
        return res.status(201).json(savedCategory);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error creating main category", error });
    }
});
exports.createMainCategory = createMainCategory;
// Update a main category by ID
const updateMainCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCategory = yield mainCategory_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Main category not found" });
        }
        return res.status(200).json(updatedCategory);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error updating main category", error });
    }
});
exports.updateMainCategory = updateMainCategory;
// Delete a main category by ID
const deleteMainCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCategory = yield mainCategory_model_1.default.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Main category not found" });
        }
        return res
            .status(200)
            .json({ message: "Main category deleted successfully" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error deleting main category", error });
    }
});
exports.deleteMainCategory = deleteMainCategory;
