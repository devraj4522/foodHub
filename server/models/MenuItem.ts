import { prisma } from "@/server/lib/prisma";
import { IMenuItem } from "@/types/Restaurant";

export class MenuItem {
  static async getMenuItemById(id: string) {
    return prisma.menuItem.findUnique({
      where: {
        id,
      },
      include: {
        restaurant: true,
      },
    });
  }

  static async searchMenuItems(query: string) {
    return prisma.menuItem.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }

}