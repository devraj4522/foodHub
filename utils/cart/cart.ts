import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const updateCart = async (items: CartItem[]) => {
  try {
    // const response = await axios.put(`${API_URL}/cart/${item.id}`, item, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    const response = [
      {
        id: '1',
        name: 'Pizza',
        price: 10,
        quantity: 1,
      }];
    return response;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

