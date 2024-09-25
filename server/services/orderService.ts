import { Order } from "../models/Order";
import { IOrder, ICreateOrderInput } from "@/types/Order";
import { OrderStatus } from "@/types/Order";
import { notifyOrderPlaced } from "../lib/slack";
import { CartItem } from "../models/Cart";

export async function createOrder(order: Omit<ICreateOrderInput, 'id' | 'createdAt' | 'updatedAt'>) {
    const newOrder = await Order.createOrder(order);
    if (newOrder) {
      CartItem.deleteCartItemByUserId(newOrder.userId);
    }
    try {
        notifyOrderPlaced(newOrder as any);
    } catch (error) {
        console.error('Failed to notify order placed:', error);
    }
    return newOrder;
}

export async function updateOrder(orderId: string, data: Partial<IOrder>) {
    const order = await Order.updateOrder(orderId, data);
    return order;
}

export async function getOrdersByUserId(userId: string) {
    const orders = await Order.getOrdersByUserId(userId);
    return orders;
}

export async function getOrdersByStatus(status: OrderStatus, userId: string) {
    const orders = await Order.getOrdersByStatus(status, userId);
    return orders;
}

export async function getOrderById(orderId: string) {
    const order = await Order.getOrderById(orderId);
    return order;
}
