import { IOrder } from "@/types/Order";
import { OrderStatus } from "@/types/Order";
import { ICreateOrderInput } from "@/types/Order";
const baseUrl = "http://localhost:3000/api/order";

export async function createOrder(data: ICreateOrderInput){
  const response = await fetch('/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function getOrdersByUserId(userId: string) {
  const response = await fetch(`${baseUrl}?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function getOrderById(orderId: string) {
  try {
    const response = await fetch(`${baseUrl}?orderId=${orderId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
}

export async function getOrdersByStatus(status: OrderStatus) {
  const response = await fetch(`${baseUrl}?status=${status}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

export async function updateOrder(orderId: string, data: Partial<IOrder>) {
  const response = await fetch(`${baseUrl}/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

