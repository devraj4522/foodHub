"use client"
// app/components/YouCanTrySection.tsx

interface Item {
  id: number;
  name: string;
  image: string;
}

interface Error {
  message: string;
}

import Link from "next/link";
import { useProducts } from "@/hooks/products/useProducts";

export default function TopItems() {
  // get items from hook
  const {data, isLoading, error} = useProducts();
  const items: Item[] = data || [];

  if (isLoading) return(
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* spinner */}
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
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">You Can Try</h2>
        <div className="flex justify-center items-center">
          <p className="text-gray-500">Error: { "Something went wrong"}</p>
        </div>
      </div>
    </section>
  )

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">You Can Try</h2>

        {/* Scrollable container */}
        <div className="flex  space-x-4 no-scrollbar">
          <div className="flex justify-around  flex-wrap md:gap-4 gap-1">
            {items.map((item, index) => (
              <Link key={index} className="flex-shrink-0 w-16 md:w-40 text-center" href={`/search?query=${item.name}`} >
                <div className="w-full h-16 md:h-40 bg-white rounded-full flex items-center justify-center">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-full rounded-full"
                  />
                </div> 
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
