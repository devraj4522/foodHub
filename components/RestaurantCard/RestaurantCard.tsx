import { getAllRestaurants } from '@/actions/restaurant';
import RestaurantListComponent from './_components/RestaurantCard';

const RestaurantList = async() => {
  const restaurants = await getAllRestaurants()
 
  return (
    <RestaurantListComponent restaurants={restaurants} />
  );
};

export default RestaurantList;
