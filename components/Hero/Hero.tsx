// app/components/HeroSection.tsx

'use client'; // This is a client component because of dynamic content (search box placeholder)

import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search for pizza...');
  const foodItems = ['pizza', 'biryani', 'rolls', 'burgers', 'sushi', 'noodles'];

  // Change the placeholder text every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSearchPlaceholder(
        `Search for '${foodItems[Math.floor(Math.random() * foodItems.length)]}'...`
      );
    }, 2000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] bg-lime-300 flex flex-col justify-center items-center overflow-hidden rounded-b-3xl">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center bg-hero-pattern opacity-70"></div>

      {/* Food images on sides */}
      <div className="absolute -left-4 -bottom-4 hidden md:block">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png" // Example food image
          alt="Delicious Food"
          className="w-24 md:w-40 rounded-full"
        />
      </div>
      <div className="absolute -right-5 bottom-10 hidden md:block">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png" // Example food image
          alt="Tasty Dish"
          className="w-24 md:w-40 rounded-full"
        />
      </div>

      {/* Search Box */}
      <div className="relative z-10 text-center mt-4 px-4 md:px-0">
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-4 md:mb-6">Discover Your Favorite Food</h1>
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="p-3 md:p-4 px-4 md:px-6 text-lg md:text-xl rounded-full shadow-lg w-full md:w-96 border-none focus:outline-none focus:ring-2 focus:ring-lime-500"
        />
      </div>
    </div>
  );
}
