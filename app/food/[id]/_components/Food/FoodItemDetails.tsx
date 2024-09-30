'use client';
import React from 'react';
import { FaClock, FaTrain, FaStar, FaShoppingCart, FaCheckCircle, FaCheckSquare } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useFetchTopItems } from '@/hooks/products/useFetchTopItems';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartAtom } from '@/recoil/atoms/cartAtom';
import { userAtom } from '@/recoil/atoms/userAtom';
import { toast } from 'sonner';
import { addItemToCart } from '@/actions/cart';
import { IMenuItem } from '@/types/Restaurant';
import { FoodItem } from '@/types/Food';
import BreadCrumb from './BreadCrumb';


interface TopItem {
  id: number;
  name: string;
  deliveryTime: string;
  rating: string;
  reviews: string;
  description: string;
  price: number;
  category: string;
  image: string;
  restaurant?: string;
  averageCost?: string;
  topItems?: string[];
}

const FoodItemDetails = ({ foodItem, handleAddToCart }: { foodItem: FoodItem, handleAddToCart: (event: React.MouseEvent<HTMLButtonElement>, menuItem:Omit<IMenuItem, 'restaurant' | 'category' | 'rating'>) => void }) => (
  <section className="bg-[#FFF2D6] overflow-hidden mb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <img
          src={foodItem.image}
          alt={foodItem.name}
          width={400}
          height={300}
          className="rounded-md w-full lg:w-1/2 object-contain h-80"
        />
        <div className="lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{foodItem.name}</h1>
          <p className="text-2xl font-semibold mb-2">{foodItem.restaurant.name}</p>
          <p className="mb-6">{foodItem.description}</p>
          <div className="flex items-center pb-4 md:pb-8">
             <FaMapMarkerAlt className="text-yellow-700 mr-2" />
             <p className="text-gray-700">{foodItem.restaurant.address} {" "} {foodItem.restaurant.city} {" "} {foodItem.restaurant.state} {" "} {foodItem.restaurant.pinCode}</p>
           </div>
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              <FaStar className="w-4 h-4 mr-1 text-yellow-500" />
              <span className="font-semibold">{foodItem.rating}</span>
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <FaClock className="w-4 h-4 mr-1" />
              {foodItem.restaurant.deliveryTime} mins
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-800">
              <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10">
                  <animate attributeName="r" values="8;10;8" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="12" cy="12" r="3">
                  <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </svg>
              <p>{foodItem.isAvailable ? 'Available' : 'Not Available'}</p>
            </span>
          </div>
          <div className="mt-6 md:mt-8 space-y-3">
            <span className="text-2xl font-bold text-balck">₹{foodItem.price?.toFixed(2)}</span>
            <div className="flex items-center">
              {foodItem.isAvailable && <Button
                variant="shadow"
                onClick={(e) => handleAddToCart(e, foodItem)}
                startContent={<FaShoppingCart className="w-6 h-6" />}
                className="font-bold bg-lime-600 text-white hover:bg-lime-700 transition-colors duration-300 transform hover:scale-105 rounded-lg px-8 py-6 flex items-center justify-center space-x-3 shadow-xl text-md"
                disabled={!foodItem.isAvailable}
              >
                <span>Add</span>
              </Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TopItemsSection = ({ topItems }: { topItems: TopItem[] }) => (
  <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r from-lime-50 to-green-50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        <span className="text-black">
          Top Picks You Can&apos;t Resist
        </span>
      </h2>
      <p className="text-center text-gray-600 mb-8">Discover our most-loved dishes that keep customers coming back for more!</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topItems.slice(0, 3).map((item: TopItem, index: number) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img
              alt={item.name}
              className="w-full h-48 object-cover"
              src={item.image}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-lime-600">₹{item.price?.toFixed(2)}</span>
                <Button
                  className="font-semibold bg-lime-500 text-white hover:bg-lime-600 transition duration-300"
                  endContent={<FaShoppingCart className="w-4 h-4" />}
                  variant="shadow"
                >
                  Quick Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link href="/bestsellers">
          <Button
            className="font-semibold bg-lime-500 text-white hover:bg-lime-600 transition duration-300 cursor-pointer"
            size="lg"
            variant="shadow"
          >
            Explore All Bestsellers
          </Button>
        </Link>
      </div>
    </div>
  </section>
);


export default function FoodItemPage({foodItem}: {foodItem: FoodItem}) {
  const [cart, setCart] = useRecoilState(cartAtom);

  const { id } = useParams();
  const { data: topItemsData, isLoading: topItemsIsLoading, error: topItemsError } = useFetchTopItems();

  if ( topItemsError) return <div>Error: {(topItemsError) as string}</div>

  let topItems: TopItem[] = [];
  if (!topItemsIsLoading && topItemsData && typeof topItemsData === 'object' && 'topItems' in topItemsData) {
    topItems = topItemsData.topItems as TopItem[];
  }

    const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>,  menuItem:Omit<IMenuItem, 'restaurant' | 'category' | 'rating'>) => {
      event.preventDefault();
      if (!cart || !cart.id) {
        toast.error('Cart not found');
        return;
      }

      try {
        const cartItemData = {
          cartId: cart.id,
          quantity: 1,
          menuItem: menuItem,
          menuItemId: menuItem.id,
        };

        // do not allow to order from different restaurant
        if (cart.items.length > 0 &&  cartItemData.menuItem.restaurantId !== cart.items[0].menuItem.restaurantId) {
          toast.error('Order From Different Restaurant? Remove items from your cart');
          return;
        }
        const response = await addItemToCart(cartItemData);
        const {id, cartId, items, quantity} = response;
        if (response && typeof response === 'object' && 'id' in response) {
          toast.success('Item added to cart')
          const newItem = {
            id: id,
            cartId: cartId,
            menuItem: {
              id: cartItemData.menuItemId,
              restaurantId: cartItemData.menuItem.restaurantId,
              name: cartItemData.menuItem.name,
              price: cartItemData.menuItem.price,
            },
            quantity: quantity,
          }
          setCart((prevCart) => {
            if (!prevCart) return null;
            const existingItemIndex = prevCart.items.findIndex(
              (item) => item.cartId === newItem.cartId && item.menuItem.id === newItem.menuItem.id
            );
            if (existingItemIndex !== -1) {
              // Item already exists, update quantity
              const updatedItems = [...prevCart.items];
              updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + 1
              };
              return { ...prevCart, items: updatedItems };
            } else {
              // Item doesn't exist, add new item
              return { ...prevCart, items: [...prevCart.items, newItem] };
            }
          });
        } else {
          toast.error('Failed to add item to cart');
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
    }
  };

  return (
    <>
    <section className="bg-yellow-50 py-4 m-0">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between h-full">
            <div className="flex items-center space-x-2 border-l-4 border-yellow-300 pl-4 py-2">
              <FaClock className="text-green-600 text-xl flex-shrink-0" />
              <span className="font-semibold text-xs md:text-base">Delivery {foodItem?.restaurant.openingTime} - {foodItem?.restaurant.closingTime}</span>
            </div>
            <div className="flex items-center space-x-2 border-l-4 border-yellow-300 pl-4 py-2">
               <FaTrain className="text-yellow-600 text-xl flex-shrink-0" />
               <span className="font-semibold text-wrap text-xs sm:text-base">Fastest Delivery</span>
              
             </div>
          </div>
        </div>
      </section>

      <BreadCrumb foodItem={foodItem} />
      <FoodItemDetails foodItem={foodItem} handleAddToCart={handleAddToCart} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Explore More from {foodItem?.restaurant.name}</h2>
        <Link href={`/restaurant/${foodItem?.restaurant.id}`} className="inline-block">
          <Button
            className="font-semibold bg-lime-500 text-white"
            variant="shadow"
          >
            View Full Menu
          </Button>
        </Link>
      </section>

      {/* <TopItemsSection topItems={topItems} /> */}
    </>
  );
}
