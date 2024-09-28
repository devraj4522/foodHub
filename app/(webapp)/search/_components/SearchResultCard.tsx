import { Card } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { ISearchResult } from "@/types/Restaurant";
import { FaStar } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
type SearchType = 'restaurant' | 'menu';

interface SearchResultCardProps {
  restaurant: ISearchResult;
  searchTerm: string;
  searchType: SearchType;
}

export function SearchResultCard({ restaurant, searchTerm, searchType }: SearchResultCardProps) {
  const router = useRouter();

  const matchingMenuItems = restaurant.menu.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
        <div className="flex h-full">
          <div className="w-1/4 ">
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="text-sm text-gray-600">{restaurant.cuisine.join(', ')}</p>
                {searchType === 'menu' && matchingMenuItems.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm font-semibold text-green-600">Matching Items:</span>
                    <ul className="list-disc list-inside">
                      {matchingMenuItems.map(item => (
                        <li key={item.id} className="text-xs text-gray-700">
                          <span className="font-medium">
                            {item.name}
                          </span>
                          {' '}- ₹{item.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded">
                <span className="mr-1">{restaurant.rating}</span>
                <FaStar className="w-3 h-3" />
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center text-gray-500">
              <div className="flex items-center">
                <FiClock className="mr-1" />
                <span>{restaurant.deliveryTime} mins</span>
              </div>
              <p className="text-sm">₹{restaurant.avgCostForTwo} for two</p>
            </div>
            <div className="mt-4">
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-green-600 transition-colors duration-300" onClick={() => router.push(`/restaurant/${restaurant.id}`)}>
                <FiShoppingCart className="mr-2" />
                Order Now
              </button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}