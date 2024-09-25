import axios from "axios";
import { IOrder } from "@/types/Order";
import { OrderStatus } from "@/types/Order";
import { ICreateOrderInput } from "@/types/Order";
const baseUrl = "http://localhost:3000/api/order";

export async function createOrder(data: ICreateOrderInput){
  const response = await axios.post(baseUrl+'/create', data);
  return response.data;
}

export async function getOrdersByUserId(userId: string) {
    const response = await axios.get(`${baseUrl}?userId=${userId}`);
    return response.data;
}

export async function getOrderById(orderId: string) {
    try{    
        const response = await axios.get(`${baseUrl}?orderId=${orderId}`);
        // console.log("response", response);
        return response.data;

    } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw error;
    }
}

export async function getOrdersByStatus(status: OrderStatus) {
    const response = await axios.get(`${baseUrl}?status=${status}`);
    return response.data;
}

export async function updateOrder(orderId: string, data: Partial<IOrder>) {
    const response = await axios.put(`${baseUrl}/${orderId}`, data);
    return response.data;
}

