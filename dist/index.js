"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const mainCategoryRoute_1 = __importDefault(require("./routes/mainCategoryRoute"));
const subCategotyRoute_1 = __importDefault(require("./routes/subCategotyRoute"));
const db_1 = __importDefault(require("./db"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const PORT = 3000;
dotenv_1.default.config();
// Middleware to parse JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.default)();
// Basic route
app.get("/", (req, res, next) => {
    res.send("Hello, TypeScript!");
});
app.use("/auth/api", authRoute_1.default);
app.use("/api/products", productRoute_1.default);
app.use("/api/subcategory", subCategotyRoute_1.default);
app.use("/api/category", categoryRoute_1.default);
app.use("/api/main-category", mainCategoryRoute_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
