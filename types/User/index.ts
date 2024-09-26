import { RestaurantData } from "../Restaurant";
import { IOrder, IOrderItem, IReview } from "../Order";

export interface IUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  otpCode?: string;
  otpExpiresAt?: Date;
  verified: boolean;
  role: string;
  city?: string;
  state?: string;
  pinCode?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
  orders?: IOrder[];
  reviews?: IReview[];
  favorites?: RestaurantData[];
}

export interface ICreateUserInput {
  name: string;
  phone: string;
  email: string;
  otpCode: string;
  otpExpiresAt?: Date;
  role?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  address?: string;
}

export interface IUserToken extends Omit<ICreateUserInput, 'phone'> {
  id: string;
}
