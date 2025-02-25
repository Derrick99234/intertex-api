import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../utils/interface/types";
import { verifyToken } from "../utils/helper/jwt-process.helper";

export const authenticate = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
