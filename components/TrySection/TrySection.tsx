"use client"
interface Item {
  id: number;
  name: string;
  image: string;
}

import Link from "next/link";
import { useProducts } from "@/hooks/products/useProducts";
import { useRef, useState, useEffect } from "react";

export default function TopItems() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {data, isLoading, error} = useProducts();
  const items: Item[] = data || [];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const updateScrollPosition = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollPosition);
      return () => container.removeEventListener('scroll', updateScrollPosition);
    }
  }, [items, isLoading, error]);

  const maxScroll = scrollContainerRef.current
    ? scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
    : 0;

  if (isLoading) return(
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full" role="status">
            <span className="visually-hidden">.</span>
          </div>
        </div>
      </div>
    </section>
  )
  
  if (error) return(
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-6">Dishes Near You</h2>
        <div className="flex justify-center items-center">
          <p className="text-gray-500">Error: { "Something went wrong"}</p>
        </div>
      </div>
    </section>
  )

  // Split items into two rows
  const firstRowItems = items.slice(0, Math.ceil(items.length / 2));
  const secondRowItems = items.slice(Math.ceil(items.length / 2));

  return (
    <section className="py-8 mt-4 md:mt-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900"> Dishes You Can Try </h2>
          <div className="flex space-x-2">
            <button 
              className={`bg-gray-100/50 rounded-full p-1 md:p-2 shadow-md ${
                scrollPosition <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleScroll('left')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className={`bg-gray-100/50 rounded-full p-1 md:p-2 shadow-md ${
                scrollPosition >= maxScroll ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleScroll('right')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide" ref={scrollContainerRef}>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-nowrap space-x-4">
                {firstRowItems.map((item, index) => (
                  <Link key={index} className="flex-shrink-0 w-24 h-24 md:w-40 md:h-40 text-center" href={`/search?query=${item.name}`}>
                    <div className=" w-24 h-24 md:w-40 md:h-40  bg-white rounded-full flex items-center justify-center ">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain w-24 h-24 md:w-40 md:h-40 rounded-full"
                      />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex flex-nowrap space-x-4">
                {secondRowItems.map((item, index) => (
                  <Link key={index} className="flex-shrink-0 w-24 h-24 md:w-40 md:h-40 text-center" href={`/search?query=${item.name}`}>
                    <div className=" w-24 h-24 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center mb-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain w-24 h-24 md:w-40 md:h-40 rounded-full"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
