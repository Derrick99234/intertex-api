import mongoose, { Document, Schema } from "mongoose";
import { IMainCategory } from "../utils/interface/types";

export interface IMainCategoryModel extends IMainCategory, Document {}

const MainCategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: Number, required: true },
    mainCategorySlug: { type: String, required: true },
    status: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MainCategory = mongoose.model<IMainCategoryModel>(
  "Categories",
  MainCategorySchema
);
export default MainCategory;
