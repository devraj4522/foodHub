import { Restaurant } from '../models/Restaurant'
import { RestaurantData } from '@/types/Restaurant';

export async function getRestaurantById(id: string) {
  return Restaurant.getRestaurantById(id)
}

export async function getAllRestaurants() {
  return Restaurant.getAllRestaurants()
}

export async function createRestaurant(data: RestaurantData) {
  return Restaurant.createRestaurant(data)
}

export async function searchRestaurantsORMenuItems(query: string) {
  return Restaurant.searchRestaurantsORMenuItems(query)
}

export async function updateRestaurant(id: string, data: Partial<Omit<RestaurantData, 'id' | 'createdAt' | 'updatedAt'>>) {
  return Restaurant.updateRestaurant(id, data)
}

export async function deleteRestaurant(id: string) {
  return Restaurant.deleteRestaurant(id)
}

