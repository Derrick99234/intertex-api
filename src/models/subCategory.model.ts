import { model, Document, Schema } from "mongoose";

export interface subCategorySchemaI extends Document {
  name: string;
  description: string;
  imageUrl: string;
  categorySlug: string;
  status: Boolean;
  categoryId: Schema.Types.ObjectId;
}

const subCategorySchema = new Schema<subCategorySchemaI>(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
    categorySlug: {
      type: String,
      require: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory = model<subCategorySchemaI>("SubCategory", subCategorySchema);
export default SubCategory;
