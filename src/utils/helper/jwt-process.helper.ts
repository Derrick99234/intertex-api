import * as jwt from "jsonwebtoken";
import { Payload } from "../interface/types";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
