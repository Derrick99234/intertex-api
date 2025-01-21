import { Request, Response } from "express";
import Category from "../models/category.model";

export async function createCategory(request: Request, response: Response) {
  const { name, description, imageUrl, categorySlug, status } = request.body;

  if (!name)
    return response.status(200).json({
      error: true,
      message: "Please provide a category name",
    });

  if (!description)
    return response.status(200).json({
      error: true,
      message: "Please provide category description",
    });

  if (!imageUrl)
    return response.status(200).json({
      error: true,
      message: "Please provide category images",
    });

  try {
    const category = await Category.create({
      name,
      description,
      imageUrl,
      categorySlug,
      status,
    });

    response.status(200).json({
      error: false,
      category,
      message: "new category created successfully",
    });
  } catch (err) {
    return response.status(500).json({
      error: true,
      err,
      message: "Internal server error, Please try again",
    });
  }
}
