import { Request, Response } from "express";
import SubCategory from "../models/subCategory.model";
import Category from "../models/category.model";

// Create SubCategories
const createSubCategory = async (req: Request, res: Response): Promise<any> => {
  const { name, description, imageUrl, status, categoryId, categorySlug } =
    req.body;

  try {
    const category = await Category.findOne({ _id: categoryId });

    if (!category)
      return res.status(404).json({
        error: true,
        message: "Wrong category id provided",
      });

    const subCategory = await SubCategory.create({
      name,
      description,
      imageUrl,
      status,
      categorySlug,
      categoryId,
    });
    res.status(200).json({
      error: false,
      subCategory,
      message: "SubCategory created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      err,
      message: "Internal server error, Please try again",
    });
  }
};

// Update subCategory
const updateSubCategory = async (req: Request, res: Response): Promise<any> => {
  const { subCategoryId } = req.params;
  const { name, description, imageUrl, status } = req.body;
  try {
    const subCategory = await SubCategory.findOne({ _id: subCategoryId });

    if (!subCategory) {
      return res.status(200).json({
        error: true,
        message: "subCategory not found, please try again with the correct ID",
      });
    }

    if (name) subCategory.name = name;
    if (description) subCategory.description = description;
    if (imageUrl) subCategory.imageUrl = imageUrl;
    subCategory.status = status;

    await subCategory.save();

    return res.status(200).json({
      error: false,
      subCategory,
      message: "SubCategory updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      err,
      message: "Internal server error, Please try again",
    });
  }
};

const getAllSubCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({
      error: false,
      subCategories,
      message: "All subcategories fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      err,
      message: "Internal server error, please try again",
    });
  }
};

// Get sub category
const getSubCategory = async (req: Request, res: Response): Promise<any> => {
  const { subCategoryId } = req.params;
  try {
    const subCategory = await SubCategory.findOne({ _id: subCategoryId });

    if (!subCategory) {
      return res.status(200).json({
        error: true,
        message: "subCategory not found, please try again with the correct ID",
      });
    }

    return res.status(200).json({
      error: false,
      subCategory,
      message: "subCategory data fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      err,
      message: "Internal server error, Please try again",
    });
  }
};

// delete subCategory
const deleteSubCategory = async (req: Request, res: Response): Promise<any> => {
  const { subCategoryId } = req.params;
  try {
    const subCategory = await SubCategory.deleteOne({ _id: subCategoryId });
    if (!subCategory) {
      return res.status(404).json({
        error: true,
        message: "SubCategory not found",
      });
    }
    return res.json({
      error: false,
      message: "Subcategory deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      err,
      message: "Internal server Error",
    });
  }
};

export {
  createSubCategory,
  updateSubCategory,
  getAllSubCategory,
  getSubCategory,
  deleteSubCategory,
};
