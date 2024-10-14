import { RestaurantData } from "@/types/Restaurant";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaMapMarkerAlt, FaShoppingCart } from "react-icons/fa";

export const RestaurantHeroSection = ({restaurant}: {restaurant: RestaurantData}) => {
  return(
  <section className="bg-[#FFF2D6] overflow-hidden mb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row md:items-center gap-8">
        <img
          src={restaurant?.image}
          alt={restaurant?.name}
          width={500}
          height={300}
          className="rounded-lg shadow-2xl w-full lg:w-1/2 object-cover"
        />
        <div className="lg:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">{restaurant?.name}</h1>
          <p className="mb-4 md:mb-6">{restaurant?.description}</p>
          <div className="flex items-center pb-4 md:pb-8">
             <FaMapMarkerAlt className="text-yellow-600 mr-2" />
             <p className="text-gray-700">{restaurant?.address} {" "} {restaurant?.city} {" "} {restaurant?.state} {" "} { restaurant.pinCode}</p>
           </div>
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{restaurant?.rating}</span>
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-800">
              <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10">
                  <animate attributeName="r" values="8;10;8" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="12" cy="12" r="3">
                  <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </svg>
              <p>Available</p>
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Moderate
            </span>
          </div>
          {/* Get Directions make it look beautiful */}
         <div className="mt-6 md:mt-8 space-y-3">
           
           <div className="flex items-center">
             <Button
               variant="shadow"
               startContent={<FaShoppingCart className="w-6 h-6" />}
               className="font-bold bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 rounded-lg px-8 py-6 flex items-center justify-center space-x-3 shadow-xl text-md"
               onClick={() => {

                 const menuSection = document.getElementById('menu-section');
                 if (menuSection) {
                   menuSection.scrollIntoView({ behavior: 'smooth' });
                 }
               }}
             >
               <Link href="#menu">
               <span>Order Online</span>
               </Link>
             </Button>
           </div>
         </div>
        </div>
      </div>
    </div>
  </section>);
}
