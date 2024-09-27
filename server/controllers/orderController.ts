import { createOrder, updateOrder, getOrdersByUserId, getOrdersByStatus, getOrderById } from "../services/orderService";
import { ICreateOrderInput } from "@/types/Order";
import { OrderStatus } from "@/types/Order";
import { IOrder } from "@/types/Order";

export async function createOrderController(data: Omit<ICreateOrderInput, 'id' | 'createdAt' | 'updatedAt'>) {
    const order = await createOrder(data);
    return order;
}

export async function updateOrderController(orderId: string, data: Partial<IOrder>) {
    const order = await updateOrder(orderId, data);
    return order;
}

export async function getOrdersByUserIdController(userId: string) {
    const orders = await getOrdersByUserId(userId);
    return orders;
}

export async function getOrdersByStatusController(status: OrderStatus, userId: string) {
    const orders = await getOrdersByStatus(status, userId);
    return orders;
}

export async function getOrderByIdController(orderId: string) {
    const order = await getOrderById(orderId);
    // console.log("order getOrderByIdController", order);
    return order;
}
