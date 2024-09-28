  
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
  menu: IMenuItem[];
  createdAt: Date;
  updatedAt: Date;
};

export interface CategoryData {
  id: string;
  name: string;
  description?: string;
  menuItems: IMenuItem[]
}

export interface IMenuItem {
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
  restaurantId: string;
  restaurant: RestaurantData;
  category: CategoryData;
  rating: number;
}

export interface IMenuSearchResult {
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
}

export interface ISearchResult {
  id: string;
  image: string;
  name: string;
  cuisine: string[];
  avgCostForTwo: number;
  rating: number;
  deliveryTime: number;
  menu: {
  id: string;
  name: string;
  price: number;
  rating: number;
}[];
}