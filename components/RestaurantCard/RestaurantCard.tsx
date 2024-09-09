import { useEffect, useState } from 'react';
import { Card } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { FiClock } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';

import { FilterIcon } from '../icons';

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
  const [restaurants, setRestaurants] = useState([] as Restaurant[]);
  const [filters, setFilters] = useState({
    veg: false,
    newlyAdded: false,
    bestSeller: false,
  });

  useEffect(() => {
    // Fetch initial restaurants data
    fetchRestaurants();
  }, [filters]);

  const fetchRestaurants = () => {
    // Mock API call to get restaurant data
    const data = [
      {
        id: 1,
        name: 'Italian Bistro',
        deliveryTime: '39 mins',
        rating: '3.5',
        reviews: '42k',
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
        averageCost: '₹250 for two',
        topItems: ['Manchurian', 'Fried Rice'],
        image: 'https://www.allrecipes.com/thmb/SoBuPU73KcbYHl3Kp3j8Xx4A3fc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8805-CrispyFriedChicken-mfs-3x2-072-d55b8406d4ae45709fcdeb58a04143c2.jpg',
      },
      {
        id: 4,
        name: 'Sagar Ratna',
        deliveryTime: '45 mins',
        rating: '4.5',
        reviews: '22k',
        averageCost: '₹400 for two',
        topItems: ['Dosa', 'Idli'],
        image: 'https://recipes.net/wp-content/uploads/2024/01/how-to-eat-for-more-than-one-dosha-1706085501.jpg',
      },
      {
        id: 5,
        name: 'Biryani House',
        deliveryTime: '35 mins',
        rating: '4.2',
        reviews: '18k',
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
        averageCost: '₹150 for two',
        topItems: ['Chocolate Pastry', 'Black Forest'],
        image: 'https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2023/5/9/chocolate-pastry.jpg',
      },
    ];

    setRestaurants(data);
  };

  const toggleFilter = (filter: 'veg' | 'newlyAdded' | 'bestSeller') => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };
  

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
        <Link href="" className='' key={restaurant.id}>
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
