import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "../../utils/interface/types";

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    salesPrice: { type: Number, required: true },
    price: { type: String, required: true },
    inStock: { type: Number, required: true },
    ratings: { type: Number, required: true },
    numberOfReviews: { type: Number, required: true },
    image: { type: String, required: true },
    otherImages: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProductModel>("Products", ProductSchema);
export default Product;
