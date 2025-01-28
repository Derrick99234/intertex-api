import mongoose, { Schema } from "mongoose";
import { IUser } from "../utils/interface/types";
export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    firstName: { type: String, require: true },
    is_super_admin: { type: Boolean, require: true },
    avatar_urls: { type: String },
    lastName: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUserModel>("User", UserSchema);
export default User;
