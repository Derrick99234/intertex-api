"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyJWT_1 = require("../middlewares/verifyJWT");
const mainCategoryController_1 = require("../controllers/mainCategoryController");
const router = express_1.default.Router();
// Login route
router.post("/create-main-category", verifyJWT_1.authenticateToken, mainCategoryController_1.createMainCategory);
router.get("/get-main-category/:id", mainCategoryController_1.getMainCategoryById);
router.get("/get-all-main-categories", mainCategoryController_1.getMainCategories);
router.put("/update-main-category/:id", mainCategoryController_1.updateMainCategory);
router.delete("/delete-main-category/:id", mainCategoryController_1.deleteMainCategory);
exports.default = router;
