"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const aws_1 = __importDefault(require("../config/aws"));
const router = (0, express_1.Router)();
router.post("/create-products", aws_1.default.fields([
    { name: "productImage", maxCount: 1 }, // Single file
    { name: "otherImages", maxCount: 5 }, // Multiple files (max 5)
]), productsController_1.createProducts);
router.get("/get-product/:id", productsController_1.getProductById);
router.get("/get-all-products", productsController_1.getProducts);
router.put("/update-product/:id", productsController_1.updateProduct);
router.delete("/delete-product/:id", productsController_1.deleteProduct);
exports.default = router;
