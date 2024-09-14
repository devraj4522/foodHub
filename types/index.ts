import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Address {
  display_name: string;
}

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string[];
  city: string;
  state: string;
  pincode: string;
  isLoggedIn: boolean;
}

export interface Restaurant {
    id: number;
    name: string;
    deliveryTime: string;
    averageCost: string;
    rating: string;
      reviews: string;
    topItems: string[];
    image: string;
}