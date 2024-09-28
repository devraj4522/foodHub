import { MenuItem } from '../models/MenuItem'
// import { IMenuItem } from '@/types/Restaurant'

// export async function getMenuItemById(id: string) {
//   return MenuItem.getMenuItemById(id);
// }

// export async function createMenuItem(data: IMenuItem) {
//   return MenuItem.createMenuItem(data);
// }

// export async function updateMenuItem(id: string, data: Partial<Omit<IMenuItem, 'id'>>) {
//   return {};
// }

// export async function deleteMenuItem(id: string) {
//   return MenuItem.deleteMenuItem(id);
// }

// export async function getMenuItemsByRestaurant(restaurantId: string) {
//   return MenuItem.getMenuItemsByRestaurant(restaurantId);
// }

export async function searchMenuItems(query: string) {
  return MenuItem.searchMenuItems(query);
}

export async function getMenuItemByIdService(id: string) {
  return MenuItem.getMenuItemById(id);
}
