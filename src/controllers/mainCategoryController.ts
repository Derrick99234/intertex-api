import { Request, Response } from "express";
import MainCategory from "../models/mainCategory.model";

// Get all main categories
export const getMainCategories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await MainCategory.find().sort({ createdAt: 1 });
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching main categories", error });
  }
};

// Get a single main category by ID
export const getMainCategoryById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const category = await MainCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Main category not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching main category", error });
  }
};

// Create a new main category
export const createMainCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const newCategory = new MainCategory(req.body);
    const savedCategory = await newCategory.save();
    return res.status(201).json(savedCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating main category", error });
  }
};

// Update a main category by ID
export const updateMainCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const updatedCategory = await MainCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Main category not found" });
    }
    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating main category", error });
  }
};

// Delete a main category by ID
export const deleteMainCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const deletedCategory = await MainCategory.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Main category not found" });
    }
    return res
      .status(200)
      .json({ message: "Main category deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting main category", error });
  }
};
