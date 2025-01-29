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
exports.createProducts = createProducts;
exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const products_model_1 = __importDefault(require("../models/products.model"));
const subCategory_model_1 = __importDefault(require("../models/subCategory.model"));
function createProducts(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { description, price, salesPrice, inStock, ratings, productName, subcategoryIds, } = request.body;
        try {
            if (!request.files || !("productImage" in request.files)) {
                return response.status(400).json({
                    message: "Product image and other images are required",
                });
            }
            if (!description ||
                !price ||
                !productName ||
                !inStock ||
                !salesPrice ||
                !ratings ||
                !subcategoryIds) {
                return response.status(400).json({
                    message: "Missing required fields",
                });
            }
            const imageUrl = request.files["productImage"][0].location;
            const otherImages = request.files["otherImages"].map((file) => file.location);
            const subcategoryId = JSON.parse(subcategoryIds);
            console.log(`subcategoryIds: ${subcategoryId}`);
            console.log(`Type of subcategoryId: ${typeof subcategoryId}`);
            subcategoryId.forEach((subcategoryId) => __awaiter(this, void 0, void 0, function* () {
                const subCategory = yield subCategory_model_1.default.findById(subcategoryId);
                if (!subCategory) {
                    return response.status(404).json({
                        status: false,
                        message: `subCategory with the id of ${subcategoryIds.join(", ")} is not found`,
                    });
                }
            }));
            const newProduct = {
                description,
                imageUrl,
                otherImages,
                price,
                salesPrice,
                inStock,
                ratings,
                productName,
                subcategoryIds: subcategoryId,
            };
            const createdProduct = yield products_model_1.default.create(newProduct);
            response.status(201).json({
                message: "Product created successfully",
                product: createdProduct,
            });
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({
                message: "Error creating product",
                error,
            });
        }
    });
}
function getProducts(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield products_model_1.default.find();
            response.status(200).json(products);
        }
        catch (error) {
            response.status(500).json({
                message: "Error fetching products",
                error,
            });
        }
    });
}
function getProductById(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const product = yield products_model_1.default.findById(id);
            if (!product) {
                return response.status(404).json({
                    message: "Product not found",
                });
            }
            response.status(200).json(product);
        }
        catch (error) {
            response.status(500).json({
                message: "Error fetching product",
                error,
            });
        }
    });
}
function updateProduct(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        const updateData = request.body;
        try {
            const updatedProduct = yield products_model_1.default.findByIdAndUpdate(id, updateData, {
                new: true,
            });
            if (!updatedProduct) {
                return response.status(404).json({
                    message: "Product not found",
                });
            }
            response.status(200).json({
                message: "Product updated successfully",
                product: updatedProduct,
            });
        }
        catch (error) {
            response.status(500).json({
                message: "Error updating product",
                error,
            });
        }
    });
}
function deleteProduct(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const deletedProduct = yield products_model_1.default.findByIdAndDelete(id);
            if (!deletedProduct) {
                return response.status(404).json({
                    message: "Product not found",
                });
            }
            response.status(200).json({
                message: "Product deleted successfully",
            });
        }
        catch (error) {
            response.status(500).json({
                message: "Error deleting product",
                error,
            });
        }
    });
}
