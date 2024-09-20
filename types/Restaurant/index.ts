  
export interface RestaurantData {
  id: string;
  name: string;
  image: string;
  description: string | null;
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
  deliveryTime: number | null;
  menu: MenuItemData[];
  createdAt: Date;
  updatedAt: Date;
};

export interface CategoryData {
  id: string;
  name: string;
  description?: string;
  menuItems: MenuItemData[]
}

export interface MenuItemData {
  id: string;
  name: string;
  description?: string;
  price: number;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spicyLevel?: number;
  isAvailable: boolean;
  image?: string;
  restaurant: RestaurantData;
  category: CategoryData;
  rating: number;
}