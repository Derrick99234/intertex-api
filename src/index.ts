import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/authRoute";
import productRoute from "./routes/productRoute";
import categoryRoute from "./routes/categoryRoute";
import mainCategoryRoute from "./routes/mainCategoryRoute";
import subCategotyRoute from "./routes/subCategotyRoute";
import paystackRouter from "./routes/paystackRoute";
import connectDB from "./db";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
connectDB();

// Basic route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello, TypeScript!");
});

app.use("/auth/api", authRoute);
app.use("/api/products", productRoute);
app.use("/api/subcategory", subCategotyRoute);
app.use("/api/category", categoryRoute);
app.use("/api/main-category", mainCategoryRoute);
app.use("/api/payments", paystackRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
