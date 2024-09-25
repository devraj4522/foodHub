import { prisma } from "@/server/lib/prisma";
import { IOrder, IOrderItem, PaymentMethod, PaymentStatus, OrderStatus, ICreateOrderInput } from "@/types/Order";
import { ICreateUserInput, IUser } from "@/types/User";
import { RestaurantData } from "@/types/Restaurant";


// export interface IOrder {
//   id: string;
//   user: IUser;
//   userId: string;
//   restaurant: RestaurantData;
//   restaurantId: string;
//   items: IOrderItem[];
//   totalAmount: number;
//   paymentMethod?: string;
//   paymentStatus: PaymentStatus;
//   paymentVerified: boolean;
//   orderStatus: OrderStatus;
//   deliveryAddress?: string;
//   deliveryInstructions?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
export class Order {
  static async createOrder(data: Omit<ICreateOrderInput, 'id' | 'createdAt' | 'updatedAt'>) {
    const createdOrder = await prisma.order.create({
      data: {
        userId: data.userId,
        restaurantId: data.restaurantId,
        items: {
          createMany: {
            data: data.items.map(item => ({
              menuItemId: item.menuItemId,
              quantity: item.quantity,
              price: item.price,
              specialInstructions: item.specialInstructions,
            })),
          },
        },
        paymentStatus: data.paymentStatus,
        paymentVerified: false,
        orderStatus: OrderStatus.PLACED,
        deliveryAddress: data.deliveryAddress,
        totalAmount: data.totalAmount,
        paymentMethod: data.paymentMethod,
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
        user: true,
        restaurant: true,
      },
    });

    return createdOrder;
  }

  static async getOrderById(orderId: string) {
    return prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  }

  static async getOrdersByUserId(userId: string) {
    return prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  }

  static async getOrdersByStatus(status: OrderStatus, userId: string) {
    return prisma.order.findMany({
      where: {
        orderStatus: status,
        userId: userId,
      },
    });
  }

  static async updatePaymentStatus(orderId: string, status: PaymentStatus) {
    return prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        paymentStatus: status,
      },
    });
  }


  static async updateOrder(orderId: string, data: Partial<IOrder>) {
    const { user, restaurant, items, ...topLevelData } = data;
    return prisma.order.update({
      where: {
        id: orderId,
      },
      data: topLevelData,
    });
  }
}


