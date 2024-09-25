import { IUser } from "../User";
import { RestaurantData, IMenuItem } from "../Restaurant";

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}


export enum OrderStatus {
  PLACED = 'placed',
  PREPARING = 'preparing',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  UPI = 'upi',
  NET_BANKING = 'net_banking',
}

export interface IOrder {
  id: string;
  user: IUser;
  userId: string;
  restaurant: RestaurantData;
  restaurantId: string;
  items: IOrderItem[];
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentVerified: boolean;
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  deliveryAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  id: string;
  order: IOrder;
  orderId: string;
  menuItem: IMenuItem;
  menuItemId: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateOrderItemInput {
  menuItemId: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface ICreateOrderInput {
  userId: string;
  restaurantId: string;
  items: ICreateOrderItemInput[];
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentVerified: boolean;
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  deliveryAddress: string;
}

export interface IReview {
  id: string;
  user: IUser;
  userId: string;
  restaurant: RestaurantData;
  restaurantId: string;
  rating: number;
  comment?: string;
  foodRating?: number;
  serviceRating?: number;
  ambience?: number;
  createdAt: Date;
  updatedAt: Date;
}
