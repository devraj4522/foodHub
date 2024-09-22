import axios from 'axios';
import { ICreateCartItemInput, ICartItem } from '@/types/Cart';

export const getCartByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`/api/cart?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting cart by user id:', error);
    throw error;
  }
};

export const addItemToCart = async (data: ICreateCartItemInput) => {
  try {
    const response = await axios.post('/api/cart', data);
    return response.data;
  } catch (error) {
    console.error('Error creating cart item:', error);
    throw error;
  }
};

export const updateCartItem = async (id: string, data: Partial<ICartItem>) => {
  try {
    const response = await axios.put(`/api/cart?id=${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const deleteCartItem = async (id: string) => {
  try {
    await axios.delete(`/api/cart?id=${id}`);
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};
