'use client';
import React from 'react';
import { FaClock, FaTrain, FaInfoCircle, FaShoppingCart, FaMapMarkerAlt, FaArrowRight, FaTag, FaArrowDown, FaStar } from 'react-icons/fa';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Button } from "@nextui-org/button";
import { useParams } from 'next/navigation';
import { Link } from '@nextui-org/link';
// import { useUpdateCart } from '@/hooks/cart/useUpdateCart';
import { toast } from 'sonner';
import { useRecoilState } from 'recoil';
import { cartAtom } from '@/recoil/atoms/cartAtom';
import { RestaurantData, IMenuItem } from '@/types/Restaurant';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { RestaurantHeroSection } from './RestaurantHeroSection/RestaurantHeroSection';
import { TopInfoBar } from './TopInfoBar';
import RestaurantCard from './RestaurantCard';

export default function RestaurantComponent({data}: {data: RestaurantData}) {
  const [activeCategory, setActiveCategory] = React.useState('');
  // const { updateCartItem, isLoading: addItemToCartLoading, isSuccess: addItemToCartSuccess} = useUpdateCart();
  // const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);

  
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
            <h3 className="text-xl font-semibold mb-4" id='menu-section'>Order Online</h3>
            {categories
              .map(({ name }, index) => (
                <div key={index} id={`category-${name}`} className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">{name}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {products
                      .filter(item => item.category.name === name)
                      .map((item: IMenuItem, index: number) => (
                        <RestaurantCard item={item} key={index} />
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

