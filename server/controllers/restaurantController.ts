import { RestaurantData } from '@/types/Restaurant'
import { createRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant } from '../services/restaurnatService'

export async function createRestaurantController(data: RestaurantData) {
  return createRestaurant(data)
}

export async function getRestaurantByIdController(id: string) {
  return getRestaurantById(id)
}

export async function updateRestaurantController(id: string, data: Partial<Omit<RestaurantData, 'id' | 'createdAt' | 'updatedAt'>>) {
  return updateRestaurant(id, data)
}

export async function deleteRestaurantController(id: string) {
  return deleteRestaurant(id)
}