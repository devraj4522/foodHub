'use client';
import React from 'react';
import { FaClock, FaTrain, FaInfoCircle, FaShoppingCart, FaMapMarkerAlt, FaArrowRight, FaTag, FaArrowDown, FaStar } from 'react-icons/fa';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Button } from "@nextui-org/button";
import { useParams } from 'next/navigation';
import { Link } from '@nextui-org/link';
import { useUpdateCart } from '@/hooks/cart/useUpdateCart';
import { toast } from 'sonner';
import { useRecoilState } from 'recoil';
import { cartItemsAtom } from '@/recoil/atoms/cartAtom';
import { RestaurantData, MenuItemData } from '@/types/Restaurant';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { RestaurantHeroSection } from './RestaurantHeroSection/RestaurantHeroSection';
import { TopInfoBar } from './TopInfoBar';

export default function RestaurantPage({data}: {data: RestaurantData}) {
  const [activeCategory, setActiveCategory] = React.useState('');
  const { updateCartItem, isLoading: addItemToCartLoading, isSuccess: addItemToCartSuccess} = useUpdateCart();
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);

  
  const restaurant = data;
  const products = restaurant.menu;
 
  const [openingTime, setOpeningTime] = React.useState('');
  const [closingTime, setClosingTime] = React.useState('');

  const categories = products.reduce((acc, product) => {
    const categoryName = product.category.name;
    const existingCategory = acc.find(cat => cat.name === categoryName);
    if (existingCategory) {
      existingCategory.count++;
    } else {
      acc.push({ name: categoryName, count: 1 });
    }
    return acc;
  }, [] as { name: string; count: number }[])
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  
  const setFirstCategory = (data:{name: string, count: number}[]) => {
    if (data.length > 0) {
      setActiveCategory(data[0].name);
    }

  }
  React.useEffect(() => {
    setFirstCategory(categories);
    if (restaurant?.openingTime) {
      setOpeningTime(new Date(`1970-01-01T${restaurant.openingTime}:00Z`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }));
    }
    if (restaurant?.closingTime) {
      setClosingTime(new Date(`1970-01-01T${restaurant.closingTime}:00Z`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }));
    }
  }, [restaurant?.openingTime, restaurant?.closingTime]);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>, item: CartItem) => {
    event.preventDefault();
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    let updatedCartItems;
    if (existingItemIndex !== -1) {
      updatedCartItems = cartItems.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
    } else {
      updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
    }
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
      <TopInfoBar openingTime={openingTime} closingTime={closingTime} />
       <BreadCrumb restaurant={restaurant} />
      {/* Hero Section */}
      <RestaurantHeroSection restaurant={restaurant} />

      {/* Menu Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Menu</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Widget */}
          <div className="md:w-1/4 mb-8 md:mb-0">
            <div className="sticky top-20">
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {
                  categories.map(({ name, count }, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => {
                          const element = document.getElementById(`category-${name}`);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                          setActiveCategory(name);
                        }}
                        className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                          activeCategory === name
                            ? 'bg-lime-200'
                            : 'hover:bg-lime-100'
                        }`}
                      >
                        {name} ({count})
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Menu Widget */}
          <div className="md:w-3/4">
            <h3 className="text-xl font-semibold mb-4">Order Online</h3>
            {categories
              .map(({ name }, index) => (
                <div key={index} id={`category-${name}`} className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">{name}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {products
                      .filter(item => item.category.name === name)
                      .map((item: MenuItemData) => (
                        <Link className='cursor-pointer transition-all duration-300' href={`/food/${item.id}`} key={item.id}>
                          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:border-gray-200">
                            <div className="relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-56 object-cover"
                              />
                              <span className="absolute top-2 right-2 flex items-center bg-gray-50 text-yellow-800 px-3 py-1 rounded-full">
                                <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-semibold">{item.rating || '4.5'}</span>
                              </span>
                            </div>
                            <div className="p-5">
                              <h4 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h4>
                              <p className="text-gray-600 mb-4 text-sm line-clamp-2">{item.description}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-lime-600">₹{item.price?.toFixed(2)}</span>
                                <Button
                                  onClick={(event) => handleAddToCart(event, {id: item.id.toString(), name: item.name, price: item.price, quantity: 1})}
                                  variant="shadow"
                                  endContent={<FaShoppingCart className="w-4 h-4" />}
                                  className="font-semibold bg-lime-600 text-white hover:bg-lime-700 transition-colors duration-300"
                                >
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
  };

