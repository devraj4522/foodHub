import { Cart, CartItem } from '../models/Cart'
import { ICartItem, ICreateCartItemInput } from '@/types/Cart'
import { IMenuItem } from '@/types/Restaurant'

export async function getCartByUserId(userId: string) {
  return Cart.getCartByUserId(userId)
}

export async function createCartItemService(data: ICreateCartItemInput) {
  return CartItem.createCartItem(data)
}

export async function updateCartItemService(id: string, data: Partial<ICartItem>) {
  if (data.quantity === 0) {
    return deleteCartItemService(id)
  }
  return CartItem.updateCartItem(id, data)
}

export async function deleteCartItemService(id: string) {
  return CartItem.deleteCartItem(id)
}
