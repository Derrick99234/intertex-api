import mongoose, { Document, Schema } from "mongoose";
import { IMainCategory } from "../utils/interface/types";

export interface IMainCategoryModel extends IMainCategory, Document {}

const MainCategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    mainCategorySlug: { type: String, required: true },
    status: { type: Boolean, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MainCategory = mongoose.model<IMainCategoryModel>(
  "MainCategory",
  MainCategorySchema
);
export default MainCategory;
