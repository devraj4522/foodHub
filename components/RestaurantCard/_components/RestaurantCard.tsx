'use client'
import { useEffect, useState } from 'react';
import { Card } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { FiClock } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import { useFetchRestaurants } from '@/hooks/restaurants/useFetchRestaurants';
import { FilterIcon } from '@/components/icons';
import { Spinner } from '@nextui-org/spinner';
import { IRestaurant } from '@/types';
import { getAllRestaurants } from '@/actions/restaurant';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
interface IFilter {
  type: 'createdAt' | 'rating' | 'deliveryTime' | 'avgCostForTwo';
  value: 'asc' | 'desc';
}

const RestaurantListComponent = ({restaurants}: {restaurants: IRestaurant[]}) => {
  const [currentFilter, setCurrentFilter] = useState({
    type: '',
    value: ''
  });
  const [carets, setCarets] = useState({
    createdAt: 'up',
    rating: 'up',
    deliveryTime: 'up',
    avgCostForTwo: 'up'
  });

  const [sortedRestaurants, setSortedRestaurants] = useState<IRestaurant[]>(restaurants);
  
  useEffect(() => {
    const currSortedRestaurants = restaurants.sort((a, b) => {
      if (currentFilter.type === 'createdAt') {
        return currentFilter.value === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
      }
      if (currentFilter.type === 'rating') {
        return currentFilter.value === 'asc' ? parseFloat(a.rating) - parseFloat(b.rating) : parseFloat(b.rating) - parseFloat(a.rating);
      }
      if (currentFilter.type === 'deliveryTime') {
        return currentFilter.value === 'asc' ? parseInt(a.deliveryTime) - parseInt(b.deliveryTime) : parseInt(b.deliveryTime) - parseInt(a.deliveryTime);
      }
      if (currentFilter.type === 'avgCostForTwo') {
        return currentFilter.value === 'asc' ? parseFloat(a.avgCostForTwo) - parseFloat(b.avgCostForTwo) : parseFloat(b.avgCostForTwo) - parseFloat(a.avgCostForTwo);
      }
      return 0;
    });
    setSortedRestaurants(currSortedRestaurants);
  }, [currentFilter]);

  const toggleFilter = (filter: 'createdAt' | 'rating' | 'deliveryTime' | 'avgCostForTwo', value: 'asc' | 'desc' = 'desc') => {
    let newValue = value;
    if (filter === currentFilter.type) {
      newValue = currentFilter.value === 'asc' ? 'desc' : 'asc';
    }
    setCarets((prev) => ({ 
      ...prev,
      [filter]: newValue === 'asc' ? 'up' : 'down'
    }));

    setCurrentFilter(() => ({
      type: filter,
      value: newValue,
    }));
  };

 
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filter Section */}
      <div className="flex space-x-2 mb-4">
      <Popover placement="bottom-start" >
          <PopoverTrigger>
            <Button
              className={`text-white ${currentFilter.type === 'createdAt' ? "bg-gray-800" : 'bg-gray-700'}`}
              startContent={<FilterIcon className='text-white' height={20} width={20} />}
            >
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px]">
            <div className="px-1 py-2 w-full">
              <h4 className="text-md font-semibold text-gray-900 mb-2">Filter Restaurants</h4>
              <div className="flex flex-col items-start justify-start space-y-2 w-full">
                <Button
                  className="text-white bg-gray-700 text-md w-full"
                  onClick={() => toggleFilter('createdAt')}
                  startContent={carets.createdAt === 'up' ? <FaCaretUp/> : <FaCaretDown/>}
                >
                  Newly Added
                </Button>
                <Button
                  className="text-white bg-gray-700 text-md w-full"
                  onClick={() => toggleFilter('deliveryTime')}
                  startContent={carets.deliveryTime === 'up' ? <FaCaretUp/> : <FaCaretDown/>}
                >
                  Delivery Time
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button
          className={`text-white ${currentFilter.type === 'rating' ? 'bg-gray-800' : 'bg-gray-700'}`}
          onClick={() => toggleFilter('rating')}
          endContent={carets.rating === 'up' ? <FaCaretUp/> : <FaCaretDown/>}
        >
          Rating
        </Button>
        <Button
          className={`text-white ${currentFilter.type === 'avgCostForTwo' ? 'bg-gray-800' : 'bg-gray-700'}`}
          onClick={() => toggleFilter('avgCostForTwo')}
          endContent={carets.avgCostForTwo === 'up' ? <FaCaretUp/> : <FaCaretDown/>}
        >
          Price
        </Button>
      </div>

      {/* Restaurant List */}
      <h2 className="text-3xl font-bold text-gray-900 text-left py-2 mb-4">Explore Restaurants Near You</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {sortedRestaurants?.map((restaurant:IRestaurant, index: number) => (
        <Link href={`/restaurant/${restaurant.id}`} className='' key={index}>
           <Card style={{width: "100%"}} className="flex md:flex-col flex-row items-center p-0 h-full sm:w-1/3 md:w-1/4 mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">

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
             <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
           </div>
   
           {/* Cuisine and Price */}
           <div className="flex mt-1 justify-between items-start text-gray-600">
              <div className="text-sm">
                {restaurant.cuisine.join(' • ')}
              </div>
                <div className="flex items-center space-x-1 p-1 px-2 rounded-full bg-green-500">
                  <span className="text-white font-medium">{restaurant.rating}</span>
                  <FaStar className="text-white w-3 h-3" />
                </div>
           </div>
   
           {/* Delivery Time */}
           <div className="flex justify-between items-center text-gray-500 mt-2">
             <div className="flex items-center space-x-1">
               <FiClock className="text-gray-400" />
               <span className="text-sm"> {restaurant.deliveryTime} mins</span>
             </div>
             <div className="text-sm">₹{restaurant.avgCostForTwo} for two</div>
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

export default RestaurantListComponent;
