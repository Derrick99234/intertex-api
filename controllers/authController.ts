import { Request, Response } from "express";
import User from "../models/auth.model";

export const createUser = async (request: Request, response: Response) => {
  const { username, password } = request.body;

  try {
    const user = new User({ username, password });
    await user.save();
    response.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Error creating user", error });
  }
};

export function login(request: Request, response: Response) {
  const { username, password } = request.body;
  response.status(200).json({
    username,
    password,
  });
}
