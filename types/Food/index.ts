export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spicyLevel: number;
  isAvailable: boolean;
  image: string;
  restaurantId: string;
  categoryId: string;
  restaurant: {
    id: string;
    name: string;
    image: string;
    description: string;
    cuisine: string[];
    address: string;
    city: string;
    state: string;
    pinCode: string;
    phone: string;
    rating: number;
    avgCostForTwo: number;
    openingTime: string;
    closingTime: string;
    isActive: boolean;
    deliveryTime: number;
    createdAt: string;
    updatedAt: string;
  };
}