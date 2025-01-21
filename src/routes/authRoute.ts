import express from "express";
import { createUser, login } from "../controllers/authController";

const router = express.Router();
// Login route
router.post("/login", login);
router.post("/register", createUser);

export default router;
