import { prisma } from '@/server/lib/prisma';
import { RestaurantData } from "@/types/Restaurant";

export class Restaurant {
  static async getRestaurantById(id: string) {
    return prisma.restaurant.findUnique({
      where: { id },
      include: {
        menu: {
          include: {
            category: {
              select: {
                name: true,
                description: true,
              }
            }
          }
        },
      },
    });
  }

  static async getAllRestaurants() {
    return prisma.restaurant.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    });
  }

  static async createRestaurant(data: RestaurantData) {
    const { menu, ...restaurantData } = data;

    return prisma.restaurant.create({
      data: restaurantData,
      include: {
        menu: true,
      },
    });
  }

  static async updateRestaurant(id: string, data: Partial<Omit<RestaurantData, 'id' | 'createdAt' | 'updatedAt' | 'menu'>>) {
    return prisma.restaurant.update({
      where: { id },
      data,
    });
  }

  static async deleteRestaurant(id: string) {
    return prisma.restaurant.delete({
      where: { id },
    });
  }

  static async searchRestaurantsORMenuItems(query: string) {
    return prisma.restaurant.findMany({
      where: {
            name: {
              contains: query,
              mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        avgCostForTwo: true,
        rating: true,
        image: true,
        cuisine: true,
        deliveryTime: true,
        menu: {
          where: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          select: {
            id: true,
            name: true,
            price: true,
            rating: true,
            image: true,
          },
        },
      },
    });
  }

}

