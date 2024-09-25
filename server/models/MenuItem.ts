import { prisma } from "@/server/lib/prisma";
import { IMenuItem } from "@/types/Restaurant";

export class MenuItem {
  static async getMenuItemById(id: string) {
    return prisma.menuItem.findUnique({
      where: { id },
    });
  }

  static async createMenuItem(data: IMenuItem) {
    const { category, restaurant, ...menuItemData } = data;
    return prisma.menuItem.create({
      data: {
        ...menuItemData,
        categoryId: category.id,
        restaurantId: restaurant.id,
      },
    });
  }

  // static async updateMenuItem(id: string, data: Partial<Omit<IMenuItem, 'id'>>) {
  //   const { category, restaurant, ...updateData } = data;

  //   if (category?.id) {
  //     updateData.categoryId = category.id;
  //   }

  //   if (restaurant?.id) {
  //     updateData.restaurantId = restaurant.id;
  //   }

  //   return prisma.menuItem.update({
  //     where: { id },
  //     data: updateData,
  //   });
  // }

  static async deleteMenuItem(id: string) {
    return prisma.menuItem.delete({
      where: { id },
    });
  }

  static async getMenuItemsByRestaurant(restaurantId: string) {
    return prisma.menuItem.findMany({
      where: { restaurantId },
    });
  }
}