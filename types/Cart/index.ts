import { IMenuItem } from '@/types/Restaurant';
import { MenuItem } from '@prisma/client';

export interface ICartItem {
  id: string;
  cartId: string;
  menuItem: IMenuItem;
  menuItemId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICart {
  id: string;
  userId: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCartItemInput {
  cartId: string;
  menuItemId: string;
  menuItem: IMenuItem;
  quantity: number;
}


export interface ICartState {
  id: string;
  userId: string;
  items: {
    id: string;
    cartId: string;
    menuItem: {
      id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}
