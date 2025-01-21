import { Request, Response } from "express";
import Product from "../src/models/products.model";

export async function createProducts(
  request: Request,
  response: Response
): Promise<any> {
  const {
    description,
    imageUrl,
    otherImages,
    price,
    salesPrice,
    inStock,
    ratings,
    numberOfReviews,
  } = request.body;

  try {
    if (
      !description ||
      !price ||
      !inStock ||
      !imageUrl ||
      !otherImages ||
      !salesPrice ||
      !ratings ||
      !numberOfReviews
    ) {
      return response.status(400).json({
        message: "Missing required fields",
      });
    }

    const newProduct = {
      description,
      imageUrl,
      otherImages,
      price,
      salesPrice,
      inStock,
      ratings,
      numberOfReviews,
    };

    const createdProduct = await Product.create(newProduct);

    response.status(201).json({
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Error creating product",
      error,
    });
  }
}

export async function getProducts(request: Request, response: Response) {
  try {
    const products = await Product.find();
    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({
      message: "Error fetching products",
      error,
    });
  }
}

export async function getProductById(
  request: Request,
  response: Response
): Promise<any> {
  const { id } = request.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return response.status(404).json({
        message: "Product not found",
      });
    }
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({
      message: "Error fetching product",
      error,
    });
  }
}

export async function updateProduct(
  request: Request,
  response: Response
): Promise<any> {
  const { id } = request.params;
  const updateData = request.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedProduct) {
      return response.status(404).json({
        message: "Product not found",
      });
    }
    response.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    response.status(500).json({
      message: "Error updating product",
      error,
    });
  }
}

export async function deleteProduct(
  request: Request,
  response: Response
): Promise<any> {
  const { id } = request.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return response.status(404).json({
        message: "Product not found",
      });
    }
    response.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    response.status(500).json({
      message: "Error deleting product",
      error,
    });
  }
}
