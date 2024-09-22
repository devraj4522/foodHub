import { prisma } from "@/server/lib/prisma";
import { IMenuItem } from "@/types/Restaurant";

export class MenuItem {
  static async getMenuItemById(id: string) {
    return prisma.menuItem.findUnique({
      where: { id },
    });
  }

  static async createMenuItem(data: IMenuItem) {
    return prisma.menuItem.create({
      data: {
        ...data,
        category: {
          connect: { id: data.category.id }
        },
        restaurant: {
          connect: { id: data.restaurant.id }
        }
      },
    });
  }

  static async updateMenuItem(id: string, data: Partial<Omit<IMenuItem, 'id'>>) {
    const updateData: any = { ...data };

    if (data.category?.id) {
      updateData.category = { connect: { id: data.category.id } };
    }

    if (data.restaurant?.id) {
      updateData.restaurant = { connect: { id: data.restaurant.id } };
    }

    return prisma.menuItem.update({
      where: { id },
      data: updateData,
    });
  }

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