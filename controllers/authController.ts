import { Request, Response } from "express";
import User from "../models/auth.model";
import * as bcryptjs from "bcryptjs";

export const createUser = async (request: Request, response: Response) => {
  const { username, password, email, firstName, lastName } = request.body;

  try {
    const hashPassword = bcryptjs.hashSync(password, 10);
    const user = new User({
      username,
      password: hashPassword,
      email,
      firstName,
      lastName,
    });
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
