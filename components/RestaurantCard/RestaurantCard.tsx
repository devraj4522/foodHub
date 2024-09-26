import { getAllRestaurants } from '@/actions/restaurant';
import RestaurantListComponent from './_components/RestaurantCard';

const RestaurantList = ({restaurants}:{restaurants:any}) => {
 
  return (
    <RestaurantListComponent restaurants={restaurants} />
  );
};

export default RestaurantList;
