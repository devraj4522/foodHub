import React from 'react';
import { FaClock, FaTrain, FaStar } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';


const foodItem = {
  id: 2,
  name: 'Whopper',
  restaurant: 'Burger King',
  deliveryTime: '20 mins',
  rating: '4.0',
  reviews: '12k',
  category: 'Burger',
  description: 'A flame-grilled beef patty topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.',
  price: 5.99,
  image: 'https://b.zmtcdn.com/data/pictures/chains/9/20092959/ee9345b9c8c03822d37fff447ab3f0ad.jpg',
};

// list of top items
const topItems = [
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
    name: 'Whopper',
    restaurant: 'Burger King',
    deliveryTime: '20 mins',
    rating: '4.0',
    reviews: '12k',
    category: 'Burger',
    description: 'A flame-grilled beef patty topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.',
    price: 5.99,
    image: 'https://b.zmtcdn.com/data/pictures/chains/9/20092959/ee9345b9c8c03822d37fff447ab3f0ad.jpg',
  },
  {
    id: 3,
    name: 'Margherita Pizza',
    restaurant: 'Pizza Hut',
    deliveryTime: '45 mins',
    rating: '4.5',
    reviews: '25k',
    category: 'Pizza',
    description: 'A classic pizza with a thin crust, topped with fresh mozzarella cheese, tomatoes, and basil.',
    price: 8.99,
    image: 'https://b.zmtcdn.com/data/pictures/chains/2/19418342/fd8aff752d2ee84cbebc859d6fd501d5.jpg',
  },
];

export default function FoodItemPage() {
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
              <span className="font-semibold">Order from Train</span>
            </div>
          </div>
        </div>
      </section>
      <section className='relative w-full bg-lime-100 overflow-hidden'>
        <nav aria-label="Breadcrumb" className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
          <ol className="flex flex-wrap items-center space-x-2">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
              <Link href="/restaurants" className="hover:underline">Restaurants</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
              <Link href={`/restaurant/${foodItem.restaurant.toLowerCase().replace(/\s+/g, '-')}`} className="hover:underline">{foodItem.restaurant}</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
              <span aria-current="page">{foodItem.name}</span>
            </li>
          </ol>
        </nav>
      </section>
      
      <section className="bg-lime-200 overflow-hidden mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <img
              alt={foodItem.name}
              className="rounded-lg shadow-2xl w-full lg:w-1/2 object-cover"
              height={300}
              src={foodItem.image}
              width={500}
            />
            <div className="lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{foodItem.name}</h1>
              <p className="text-2xl font-semibold mb-2">{foodItem.restaurant}</p>
              <p className="mb-6">{foodItem.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="badge badge-outline">{foodItem.category}</span>
                <span className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  <FaStar className="w-4 h-4 mr-1 text-yellow-500" />
                  <span className="font-semibold">{foodItem.rating}</span>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <FaClock className="w-4 h-4 mr-1" />
                  {foodItem.deliveryTime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">₹{foodItem.price.toFixed(2)}</span>
                <Button
                  className="font-semibold bg-lime-600 px-8 py-6 text-white"
                  endContent={<FaShoppingCart className="w-6 h-6" />}
                  variant="shadow"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Explore More from {foodItem.restaurant}</h2>
        <Link href={`/restaurant/${foodItem.restaurant.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block">
          <Button
            className="font-semibold bg-lime-600 text-white"
            variant="shadow"
          >
            View Full Menu
          </Button>
        </Link>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r from-lime-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="text-black">
            Top Picks You Can&apos;t Resist
          </span>
        </h2>
        <p className="text-center text-gray-600 mb-8">Discover our most-loved dishes that keep customers coming back for more!</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topItems.slice(0, 3).map((item: any) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
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
                    className="font-semibold bg-lime-600 text-white hover:bg-lime-700 transition duration-300"
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
              className="font-semibold bg-lime-600 text-white hover:bg-lime-700 transition duration-300 cursor-pointer"
              size="lg"
              variant="shadow"
            >
              Explore All Bestsellers
            </Button>
          </Link>
        </div>
        </div>
      </section>
    </>
  );
}
