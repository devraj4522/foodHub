import React from 'react';

import { FaCartShopping } from 'react-icons/fa6';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/breadcrumbs";
import { FaClock, FaTrain, FaInfoCircle } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import { FaShoppingCart } from 'react-icons/fa';

const menu = [
  {
    id: 1,
    name: 'Italian Bistro',
    deliveryTime: '39 mins',
    rating: '3.5',
    reviews: '42k',
    description: 'A cozy Italian restaurant known for its authentic pizzas and pastas.',
    price: 10.99,
    category: 'Pizza',
    averageCost: '₹300 for two',
    topItems: ['Pizza', 'Pasta'],
    image: 'https://b.zmtcdn.com/data/pictures/chains/2/19418342/fd8aff752d2ee84cbebc859d6fd501d5.jpg',
  },
  {
    id: 2,
    name: 'Burger King',
    deliveryTime: '20 mins',
    rating: '4.0',
    reviews: '12k',
    category: 'Burger',
    description: 'A fast food restaurant known for its burgers, fries, and other fast food items.',
    price: 5.99,
    averageCost: '₹200 for two',
    topItems: ['Whopper', 'Fries'],
    image: 'https://b.zmtcdn.com/data/pictures/chains/9/20092959/ee9345b9c8c03822d37fff447ab3f0ad.jpg',
  },
  {
    id: 3,
    name: 'The Chinese Box',
    deliveryTime: '30 mins',
    rating: '3.8',
    reviews: '8k',
    description: 'A Chinese restaurant known for its Chinese food, including noodles, rice, and other Chinese dishes.',
    price: 8.99,
    averageCost: '₹250 for two',
    category: 'Chinese',
    topItems: ['Manchurian', 'Fried Rice'],
    image: 'https://www.allrecipes.com/thmb/SoBuPU73KcbYHl3Kp3j8Xx4A3fc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8805-CrispyFriedChicken-mfs-3x2-072-d55b8406d4ae45709fcdeb58a04143c2.jpg',
  },
  {
    id: 4,
    name: 'Sagar Ratna',
    deliveryTime: '45 mins',
    rating: '4.5',
    reviews: '22k',
    description: 'A South Indian restaurant known for its South Indian food, including dosa, idli, and other South Indian dishes.',
    price: 12.99,
    category: 'South Indian',
    averageCost: '₹400 for two',
    topItems: ['Dosa', 'Idli'],
    image: 'https://recipes.net/wp-content/uploads/2024/01/how-to-eat-for-more-than-one-dosha-1706085501.jpg',
  },
  {
    id: 5,
    name: 'Biryani House',
    deliveryTime: '35 mins',
    rating: '4.2',
    description: 'A restaurant known for its Biryani, including chicken biryani, mutton biryani, and other Biryani dishes.',
    price: 15.99,
    reviews: '18k',
    category: 'Biryani',
    averageCost: '₹350 for two',
    topItems: ['Chicken Biryani', 'Mutton Biryani'],
    image: 'https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg',
  },
  {
    id: 6,
    name: 'The Pizza Place',
    deliveryTime: '25 mins',
    rating: '4.3',
    reviews: '15k',
    category: 'Pizza',
    description: 'A pizza restaurant known for its pizza, including margherita pizza, farmhouse pizza, and other pizza dishes.',
    price: 11.99,
    averageCost: '₹250 for two',
    topItems: ['Margherita', 'Farmhouse'],
    image: 'https://b.zmtcdn.com/data/reviews_photos/ead/2a1826787ec13c007c17e76502bb8ead_1639634307.jpg',
  },
  {
    id: 7,
    name: 'The Dhaba',
    deliveryTime: '40 mins',
    rating: '4.1',
    reviews: '10k',
    category: 'North Indian',
    description: 'A restaurant known for its North Indian food, including butter chicken, naan, and other North Indian dishes.',
    price: 15.99,
    averageCost: '₹300 for two',
    topItems: ['Butter Chicken', 'Naan'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ8vpqzG1hDGjt-tOmgnMaHXs7TdQBfyRL_w&s',
  },
  {
    id: 8,
    name: 'The Pastry Shop',
    deliveryTime: '30 mins',
    rating: '4.4',
    reviews: '25k',
    category: 'Desserts',
    description: 'A dessert restaurant known for its desserts, including chocolate pastry, black forest, and other desserts.',
    price: 10.99,
    averageCost: '₹150 for two',
    topItems: ['Chocolate Pastry', 'Black Forest'],
    image: 'https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2023/5/9/chocolate-pastry.jpg',
  },
];

export default function RestaurantPage() {
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
                <a href="/restaurants" className="hover:underline">Restaurants</a>
              </li>
              <li>
                <span className="mx-2">/</span>
                <span aria-current="page">Restaurant Name</span>
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
              <div className="flex flex-wrap gap-4">
                <span className="badge badge-outline">Cuisine Type</span>
                <span className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">4.5</span>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-800">
                  <svg className="w-4 h-4 text-blue-500 animate-pulse mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
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
              {menu.map((item) => (
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

                        variant="shadow"
                        endContent={<FaCartShopping className="w-4 h-4" />}
                        className="font-semibold bg-lime-600 text-white"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
  };

