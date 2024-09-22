import {
  createCartItemService,
  updateCartItemService,
  deleteCartItemService,
  getCartByUserId
} from '../services/CartService'
import { ICreateCartItemInput, ICartItem } from '@/types/Cart'

export async function getCartByUserIdController(userId: string) {
  return getCartByUserId(userId)
}

export async function createCartItemController(data: ICreateCartItemInput) {
  return createCartItemService(data)
}

export async function updateCartItemController(id: string, data: Partial<ICartItem>) {
  return updateCartItemService(id, data)
}

export async function deleteCartItemController(id: string) {
  return deleteCartItemService(id)
}