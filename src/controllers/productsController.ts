import { Request, Response } from "express";
import Product from "../models/products.model";
import SubCategory from "../models/subCategory.model";

export async function createProducts(
  request: Request,
  response: Response
): Promise<any> {
  const {
    description,
    price,
    salesPrice,
    inStock,
    ratings,
    productName,
    selectedOptions,
    subcategoryIds,
  } = request.body;

  try {
    if (!request.files || !("productImage" in request.files)) {
      return response.status(400).json({
        message: "Product image and other images are required",
      });
    }
    if (
      !description ||
      !price ||
      !productName ||
      !inStock ||
      !salesPrice ||
      !ratings ||
      !selectedOptions ||
      !subcategoryIds
    ) {
      return response.status(400).json({
        message: "Missing required fields",
      });
    }

    const imageUrl = (request.files as any)["productImage"][0].location;
    let otherImages: string[] = [];
    if (otherImages) {
      otherImages = (request.files as any)["otherImages"].map(
        (file: any) => file.location
      );
    }

    const subcategoryId = JSON.parse(subcategoryIds);
    subcategoryId.forEach(async (subcategoryId: string) => {
      const subCategory = await SubCategory.findById(subcategoryId);

      if (!subCategory) {
        return response.status(404).json({
          status: false,
          message: `subCategory with the id of ${subcategoryIds.join(
            ", "
          )} is not found`,
        });
      }
    });

    const newProduct = {
      description,
      imageUrl,
      otherImages,
      price,
      salesPrice,
      inStock,
      ratings,
      productName,
      subcategoryIds: subcategoryId,
      sizes: selectedOptions,
    };

    const createdProduct = await Product.create(newProduct);

    response.status(201).json({
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    console.log(error);
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
