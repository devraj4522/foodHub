'use client';
import React, { Fragment } from 'react';
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
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from '@nextui-org/avatar';

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Menu</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Menu Widget */}
          <div className="w-full">
            {/* <h3 className="text-xl font-semibold mb-4" id='menu-section'>Order Online</h3> */}
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

      {/* Floating Menu Button */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="fixed text-center bottom-20 right-6 z-50 bg-black text-white rounded-full shadow-lg py-6 px-4 font-bold"
            startContent={<img  src={"/assets/menuIcon.svg"} className="w-8 h-8 mt-1 text-white" />}
          >
            Menu
          </Button>
          
        </DropdownTrigger>
        <DropdownMenu aria-label="Menu Categories">
          {[{name: "All", count: products.length}].concat(categories).map(({ name, count }, index) => (
            <DropdownItem
              key={index.toString()}
              onClick={() => {
                const element = document.getElementById(`category-${name}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
                setActiveCategory(name);
              }}
            >
              <div className="flex flex-row justify-between">
                <span className="text-gray-950 font-bold text-md">{name}</span>
                <span className="text-gray-500 text-sm">{count} {count === 1 ? "item" : "items"}</span>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
  };

