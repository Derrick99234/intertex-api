import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "../utils/interface/types";

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    salesPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true },
    ratings: { type: Number, required: true },
    numberOfReviews: { type: Number },
    imageUrl: { type: String, required: true },
    otherImages: { type: Array },
    subcategoryIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SubCategory",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProductModel>("Products", ProductSchema);
export default Product;
