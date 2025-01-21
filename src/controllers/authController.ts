import { Request, Response } from "express";
import User from "../models/auth.model";
import * as bcryptjs from "bcryptjs";
import { generateToken } from "../../utils/helper/jwt-process.helper";

export async function createUser(
  request: Request,
  response: Response
): Promise<any> {
  const { username, password, email, firstName, lastName } = request.body;
  try {
    if (!username || !password || !email || !firstName || !lastName) {
      return response.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
    });
    const payload = {
      id: String(user._id),
      email,
    };
    const token = generateToken(payload);
    response
      .status(201)
      .json({ message: "User created successfully", user, token });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Error creating user", error });
  }
}

export async function login(
  request: Request,
  response: Response
): Promise<any> {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).jsonp();
    }

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return response.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: String(user._id),
      email: user.email,
    };
    const token = generateToken(payload);

    response.status(200).json({
      message: "Login successful",
      user,
      token,
    });

    response.status(200).json({
      username,
      password,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Error logining user", error });
  }
}
