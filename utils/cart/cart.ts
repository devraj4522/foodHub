import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const addToCart = async (item: CartItem) => {
  // const response = await axios.post(`${API_URL}/cart`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: item,
  // });
  const response = [
    {
      id: '1',
      name: 'Pizza',
    price: 10,
    quantity: 1,
  }];
  return response;
};