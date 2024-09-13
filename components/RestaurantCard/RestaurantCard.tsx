import { useEffect, useState } from 'react';
import { Card } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { FiClock } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import { useFetchRestaurants } from '@/hooks/restaurants/useFetchRestaurants';
import { FilterIcon } from '../icons';
import { Spinner } from '@nextui-org/spinner';

interface Restaurant {
  id: number;
  name: string;
  deliveryTime: string;
  averageCost: string;
  rating: string;
  reviews: string;
  topItems: string[];
  image: string;
}

const RestaurantList = () => {
  const [filters, setFilters] = useState({
    veg: false,
    newlyAdded: false,
    bestSeller: false,
  });


  const { data, isLoading, error } = useFetchRestaurants(filters);
  const restaurants: Restaurant[] = data?.data || [];

  const toggleFilter = (filter: 'veg' | 'newlyAdded' | 'bestSeller') => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };
  
  if (isLoading) return(
    // spinner
    <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>
  );
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filter Section */}
      <div className="flex space-x-2 mb-4">
        <Button
          className={`bg-lime-600 text-white ${filters.veg ? "bg-lime-700" : ''}`}
          onClick={() => toggleFilter('veg')}
          startContent={<FilterIcon className='text-white' height={20} width={20} />}
        >
          Filter
        </Button>
        <Button
          className={` bg-lime-600 text-white ${filters.newlyAdded ? 'bg-lime-700' : ''}`}
          onClick={() => toggleFilter('newlyAdded')}
        >
          Newly Added
        </Button>
        <Button
          className={`bg-lime-600 text-white ${filters.bestSeller ? 'bg-lime-700' : ''}`}
          onClick={() => toggleFilter('bestSeller')}
        >
          Best Seller
        </Button>
      </div>

      {/* Restaurant List */}
      <h2 className="text-3xl font-bold text-gray-800 text-left py-2 mb-4">Explore Restaurants Near You</h2>
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4">
      {restaurants.map((restaurant:Restaurant) => (
        <Link href={`/restaurant/${restaurant.id}`} className='' key={restaurant.id}>
           <Card style={{width: "100%"}} className="flex md:flex-col flex-row items-center p-0 h-full sm:w-1/3 md:w-1/4 mx-auto shadow-lg hover:shadow-xl">
         {/* Image Section */}
         <div className="md:w-full h-full w-1/3 mb-0">
           <img
             src={restaurant.image}
             alt="Restaurant Card"
             className="w-full h-full md:h-48 rounded-none object-cover"
           />
         </div>
   
         {/* Details Section */}
         <div className="md:w-full md:p-4 w-2/3 flex flex-col justify-between px-4">
           {/* Name and Rating */}
           <div className="flex justify-between items-center">
             <h3 className="text-lg font-semibold">{restaurant.name}</h3>
           </div>
   
           {/* Cuisine and Price */}
           <div className="flex mt-1 justify-between  items-start text-gray-600">
              <div className="text-sm">
                {restaurant.topItems.join(' . ')}
              </div>
                <div className="flex items-center space-x-1 p-1 px-2 rounded-full bg-green-600">
                  <span className="text-white">{restaurant.rating}</span>
                  <FaStar className="text-white w-4" />
                </div>
           </div>
   
           {/* Delivery Time */}
           <div className="flex justify-between items-center text-gray-500">
             <div className="flex items-center space-x-1">
               <FiClock />
               <span> {restaurant.deliveryTime} </span>
             </div>
            <br />
             <div>{restaurant.averageCost}</div>
           </div>

         </div>
       </Card>
        </Link>
        ))}
      </div>
    </div>
    </section>
  );
};

export default RestaurantList;
