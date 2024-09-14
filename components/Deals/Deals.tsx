// app/components/ExploreSection.tsx

import { FaTags, FaPercentage, FaGift, FaFire, FaShoppingBag } from 'react-icons/fa'; // Import some icons from react-icons
import React from 'react';

export default function ExploreSection() {
  const exploreItems = [
    {
      id: 1,
      icon: <FaTags className="text-[#06C167]" />,
      title: 'Offers',
      description: 'Discover exciting offers and discounts on your favorite products.',
    },
    {
      id: 2,
      icon: <FaPercentage className="text-[#06C167]" />,
      title: 'Discounts',
      description: 'Discover exciting offers and discounts on your favorite products.',
    },
    {
      id: 3,
      icon: <FaGift className="text-[#06C167]" />,
      title: "Deals",
      description: 'Discover exciting offers and discounts on your favorite products.',
    },
    {
      id: 4,
      icon: <FaFire className="text-[#06C167]" />,
      title: 'Trending',
      description: 'Discover exciting offers and discounts on your favorite products.',
    },
    {
      id: 5,
      icon: <FaShoppingBag className="text-[#06C167]" />,
      title: 'New',
      description: 'Discover exciting offers and discounts on your favorite products.',
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore</h2>
        <div className="grid grid-cols-5 gap-4">
          {exploreItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-200 p-3 flex flex-col items-center text-center"
            >
              <div className="mb-2 flex items-center justify-center">
                {React.cloneElement(item.icon, { size: 24 })}
              </div>
              <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-sm hidden sm:block text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
