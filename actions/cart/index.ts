import { ICreateCartItemInput, ICartItem } from '@/types/Cart';

export const getCartByUserId = async (userId: string) => {
  try {
    const response = await fetch(`/api/cart?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting cart by user id:', error);
    throw error;
  }
};

export const addItemToCart = async (data: ICreateCartItemInput) => {
  try {
    const response = await fetch('/api/cart', {
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
  } catch (error) {
    console.error('Error creating cart item:', error);
    throw error;
  }
};

export const updateCartItem = async (id: string, data: Partial<ICartItem>) => {
  try {
    const response = await fetch(`/api/cart?id=${id}`, {
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
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const deleteCartItem = async (id: string) => {
  try {
    const response = await fetch(`/api/cart?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};
