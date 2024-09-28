import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Address {
  display_name: string;
}

export interface UserDetails {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  isLoggedIn: boolean;
}

export interface IRestaurant {
    id: number;
    name: string;
    deliveryTime: string;
    avgCostForTwo: string;
    rating: string;
    reviews: string;
    cuisine: string[];
    image: string;
    createdAt: number;
}