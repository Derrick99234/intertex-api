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

export interface Payload {
  id: string;
  email: string;
}

export interface UserRequest extends Request {
  user: string;
}
