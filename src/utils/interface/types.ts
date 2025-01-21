import { Request } from "express";

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  productName: string;
  salesPrice: number;
  price: string;
  inStock: number;
  ratings: number;
  numberOfReviews: number;
  image: string;
  otherImages: string[];
}
export interface ICategory {
  name: string;
  description: string;
  imageUrl: string;
  categorySlug: string;
  status: boolean;
}

export interface Payload {
  id: string;
  email: string;
}

export interface UserRequest extends Request {
  user: string;
}
