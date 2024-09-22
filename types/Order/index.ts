import { IUser } from "../User";
import { RestaurantData, IMenuItem } from "../Restaurant";

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum OrderStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}


export interface IOrder {
  id: string;
  user: IUser;
  userId: string;
  restaurant: RestaurantData;
  restaurantId: string;
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod?: string;
  paymentStatus: PaymentStatus;
  paymentVerified: boolean;
  orderStatus: OrderStatus;
  deliveryAddress?: string;
  deliveryInstructions?: string;
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
