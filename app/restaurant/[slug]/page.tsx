'use client';
import React from 'react';
import { FaClock, FaTrain, FaInfoCircle, FaShoppingCart, FaMapMarkerAlt, FaArrowRight, FaTag, FaArrowDown } from 'react-icons/fa';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Button } from "@nextui-org/button";
import { useFetchProducts } from '@/hooks/restaurants/useFetchProducts';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { Link } from '@nextui-org/link';
import { Spinner } from '@nextui-org/spinner';
import { useUpdateCart } from '@/hooks/cart/useUpdateCart';
import { toast } from 'sonner';
import { useRecoilState } from 'recoil';
import { cartItemsAtom } from '@/recoil/atoms/cartAtom';
import { getRestaurantById } from '@/utils/products/products';
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function RestaurantPage() {
  const { slug } = useParams();
  const { updateCartItem, isLoading: addItemToCartLoading, isSuccess: addItemToCartSuccess} = useUpdateCart();
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  
  const data = getRestaurantById(slug as string);
  const restaurant = data?.restaurant;
  const products = data?.products;

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>, item: CartItem) => {
    event.preventDefault();
    const updatedCartItems = [...cartItems, item];
    updateCartItem(updatedCartItems);
    setCartItems(updatedCartItems);
  };

  React.useEffect(() => {
    if (addItemToCartLoading) {
      toast.loading('Adding to cart...', { id: 'addToCart' });
    } else {
      if (addItemToCartSuccess) {
        toast.success('Item added to cart', { id: 'addToCart' });
      } else if (!addItemToCartLoading && !addItemToCartSuccess) {
        toast.error('Failed to add item to cart', { id: 'addToCart' });
      }
    }
  }, [addItemToCartLoading, addItemToCartSuccess]);
  
  return (
    <>
       <section className="bg-yellow-50 py-4 m-0">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col sm:flex-row items-center justify-between h-full">
             <div className="flex items-center space-x-2 border-l-4 border-yellow-300 pl-4 py-2 mb-4 sm:mb-0">
               <FaClock className="text-lime-500 text-xl" />
               <span className="font-semibold">Delivery: 9 AM - 8 PM</span>
             </div>
             <div className="flex items-center space-x-2 border-l-4 border-yellow-300 pl-4 py-2">
               <FaTrain className="text-lime-500 text-xl" />
               <span className="font-semaibold">Order from Train</span>
             </div>
           </div>
         </div>
       </section>
       <section className='relative w-full bg-lime-100 overflow-hidden'>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
            <ol className="flex flex-wrap items-center space-x-2">
              <li>
                <a href="/" className="hover:underline">Home</a>
              </li>
              <li>
                <span className="mx-2">/</span>
                <a href="/" className="hover:underline">Restaurants</a>
              </li>
              <li>
                <span className="mx-2">/</span>
                <Link href={`/restaurant/${slug}`} className="hover:underline">{restaurant?.name}</Link>
              </li>
            </ol>
          </nav>
      </section>
      {/* Hero Section */}
      <section className="bg-lime-200 overflow-hidden mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <img
              src="https://product-assets.faasos.io/eatsure_cms/production/5dc6b181-0749-4617-87be-d4a227998324.jpg"
              alt="Restaurant Name"
              width={500}
              height={300}
              className="rounded-lg shadow-2xl w-full lg:w-1/2 object-cover"
            />
            <div className="lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Burger King</h1>
              <p className="mb-6">BurgerBKinguis a fast food restaurant that serves burgers, fries, and other fast food items.rger King is a fast food restaurant that serves burgers, fries, and other fast food items.</p>
              <div className="flex items-center pb-4 md:pb-8">
                 <FaMapMarkerAlt className="text-lime-600 mr-2" />
                 <p className="text-gray-700">123 Main St, Cityville, State 12345</p>
               </div>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">4.5</span>
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
                  <p>Available</p>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Moderate
                </span>
              </div>
              {/* Get Directions make it look beautiful */}
             <div className="mt-4 md:mt-8 space-y-3">
               
               <div className="flex items-center">
                 <Button
                   variant="shadow"
                   startContent={<FaShoppingCart className="w-6 h-6" />}
                   className="font-bold bg-lime-600 text-white hover:bg-lime-700 transition-colors duration-300 transform hover:scale-105 rounded-lg px-8 py-6 flex items-center justify-center space-x-3 shadow-xl text-md"
                   onClick={() => {
                     const menuSection = document.getElementById('menu-section');
                     if (menuSection) {
                       menuSection.scrollIntoView({ behavior: 'smooth' });
                     }
                   }}
                 >
                   <span>Order Online</span>
                 </Button>
               </div>
             </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Menu</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories */}
          <div className="md:w-1/4">
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <button className="w-full text-left py-2 px-4 rounded-lg bg-lime-100 hover:bg-lime-200 transition-colors">
                  Burgers
                </button>
              </li>
              <li>
                <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-lime-100 transition-colors">
                  Sides
                </button>
              </li>
              <li>
                <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-lime-100 transition-colors">
                  Beverages
                </button>
              </li>
              <li>
                <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-lime-100 transition-colors">
                  Desserts
                </button>
              </li>
            </ul>
          </div>

          {/* Food Items */}
          <div className="md:w-3/4">
            <h3 className="text-xl font-semibold mb-4">Order Online</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products?.map((item:any) => (
                <Link href={`/food/${item.id}`} key={item.id}>
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2">{item.name}</h4>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">₹{item.price?.toFixed(2)}</span>
                      <Button
                        onClick={(event) => handleAddToCart(event, {id: item.id.toString(), name: item.name, price: item.price, quantity: 1})}
                        variant="shadow"
                        endContent={<FaShoppingCart className="w-4 h-4" />}
                        className="font-semibold bg-lime-600 text-white"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
  };

