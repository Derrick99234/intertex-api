import { NextFunction, Request, Response } from "express";
import Category from "../models/category.model";

export async function createCategory(
  request: Request,
  response: Response
): Promise<any> {
  const { name, description, categorySlug, status, mainCategoryId } =
    request.body;
  const imageUrl = (request.files as any)["imageUrl"][0].location;
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

  if (!mainCategoryId)
    return response.status(200).json({
      error: true,
      message: "Please provide main category id",
    });

  try {
    const category = await Category.create({
      name,
      description,
      imageUrl,
      categorySlug,
      status,
      mainCategoryId,
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

export async function getAllCategories(
  request: Request,
  response: Response
): Promise<any> {
  try {
    const categories = await Category.find();

    response.status(200).json({
      error: false,
      categories,
    });
  } catch (err) {
    return response.status(500).json({
      error: true,
      err,
      message: "Internal server error, Please try again",
    });
  }
}

export async function getCategory(
  request: Request,
  response: Response
): Promise<any> {
  const { id } = request.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return response.status(404).json({
        error: true,
        message: "Category not found",
      });
    }

    response.status(200).json({
      error: false,
      category,
    });
  } catch (err) {
    return response.status(500).json({
      error: true,
      err,
      message: "Internal server error, Please try again",
    });
  }
}

export async function fetchCategoryByMainCategoryId(
  request: Request,
  response: Response
): Promise<any> {
  const { mainCategoryId } = request.params;
  try {
    const categories = await Category.find({ mainCategoryId });

    if (!categories) {
      return response.status(404).json({
        error: true,
        message: "Category not found",
      });
    }

    response.status(200).json({
      error: false,
      categories,
    });
  } catch (err) {
    return response.status(500).json({
      error: true,
      err,
      message: "Internal server error, Please try again",
    });
  }
}

export async function updateCategory(
  request: Request,
  response: Response
): Promise<any> {
  const { id } = request.params;
  const { name, description, imageUrl, categorySlug, status, mainCategoryId } =
    request.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description, imageUrl, categorySlug, status, mainCategoryId },
      { new: true }
    );

    if (!category) {
      return response.status(404).json({
        error: true,
        message: "Category not found",
      });
    }

    response.status(200).json({
      error: false,
      category,
      message: "Category updated successfully",
    });
  } catch (err) {
    return response.status(500).json({
      error: true,
      err,
      message: "Internal server error, Please try again",
    });
  }
}

export async function deleteCategory(
  request: Request,
  response: Response
): Promise<any> {
  const { id } = request.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return response.status(404).json({
        error: true,
        message: "Category not found",
      });
    }

    response.status(200).json({
      error: false,
      message: "Category deleted successfully",
    });
  } catch (err) {
    return response.status(500).json({
      error: true,
      err,
      message: "Internal server error, Please try again",
    });
  }
}
