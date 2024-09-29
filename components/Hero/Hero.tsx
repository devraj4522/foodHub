// app/components/HeroSection.tsx

'use client'; // This is a client component because of dynamic content (search box placeholder)

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const navigate = useRouter();
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
    <div className="relative w-full bg-right-bottom md:bg-bottom md:-mt-16 -mt-20 pt-4 h-[50vh] md:h-[80vh] flex flex-col justify-center items-center overflow-hidden" style={{ 
      backgroundImage: 'url(https://res.cloudinary.com/dhcwfa4vu/image/upload/v1727517386/foodhub/static/MacBook_Pro_16__-_1_1_ynhtve.webp)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      }}>
      {/* Search Box */}
      <div className="relative z-10 text-center md:mt-4 px-4 md:px-0">
        <h1 className="text-3xl md:text-5xl max-w-xl font-bold text-gray-800 mb-4 md:mb-6">Order Your Favorite <br/> Food</h1>
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="p-3 md:p-4 px-4 md:px-6 text-lg md:text-xl rounded-full shadow-lg w-full md:w-96 border-none focus:outline-none focus:ring-2 focus:ring-lime-500"
          onClick={() => navigate.push('/search')}
        />
      </div>
    </div>
  );
}
