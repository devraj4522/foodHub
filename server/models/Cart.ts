import { prisma } from "@/server/lib/prisma";
import { ICartItem, ICreateCartItemInput } from "@/types/Cart";

export class CartItem {
  static async getCartItemById(id: string) {
    return prisma.cartItem.findUnique({
      where: { id },
    });
  }
  
  static async createCartItem(data: ICreateCartItemInput) {
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: data.cartId,
        menuItemId: data.menuItemId,
      },
    });

    if (existingItem) {
      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + data.quantity,
        },
      });
    } else {
      return prisma.cartItem.create({
        data: {
          cartId: data.cartId,
          menuItemId: data.menuItemId,
          quantity: data.quantity,
        },
      });
    }
  }

  static async updateCartItem(id: string, data: Partial<Omit<ICartItem, 'id' | 'cartId' | 'menuItem'>>) {
    return prisma.cartItem.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  static async deleteCartItem(id: string) {
    return prisma.cartItem.delete({
      where: { id },
    });
  }

  static async deleteCartItemByUserId(userId: string) {
    return prisma.cartItem.deleteMany({
      where: { cart: { userId } },
    });
  }

}

export class Cart {
  static async getCartByUserId(userId: string) {
    return prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    });
  }

  static async createCart(userId: string) {
    return prisma.cart.create({
      data: { userId },
    });
  }

  
}