import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "../utils/interface/types";

export interface ICategoryModel extends ICategory, Document {}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: Number, required: true },
    categorySlug: { type: String, required: true },
    status: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<ICategoryModel>("Categories", CategorySchema);
export default Category;
