import { MenuItemData } from "@/types/Restaurant";
import {
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemsByRestaurant
} from '../services/menuItemService';

export async function getMenuItemByIdController(id: string) {
  return getMenuItemById(id);
}

export async function createMenuItemController(data: MenuItemData) {
  return createMenuItem(data);
}

export async function updateMenuItemController(id: string, data: Partial<Omit<MenuItemData, 'id'>>) {
  return updateMenuItem(id, data);
}

export async function deleteMenuItemController(id: string) {
  return deleteMenuItem(id);
}

export async function getMenuItemsByRestaurantController(restaurantId: string) {
  return getMenuItemsByRestaurant(restaurantId);
}
