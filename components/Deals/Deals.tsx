// app/components/ExploreSection.tsx

import { FaTags, FaPercentage, FaGift, FaFire, FaShoppingBag } from 'react-icons/fa'; // Import some icons from react-icons

export default function ExploreSection() {
  const exploreItems = [
    {
      id: 1,
      icon: <FaTags size={40} className="text-lime-500" />, // Icon for Offers
      title: 'Exclusive Offers',
      description: 'Get exclusive discounts on top-rated restaurants.',
    },
    {
      id: 2,
      icon: <FaPercentage size={40} className="text-lime-500" />, // Icon for Discounts
      title: 'Special Discounts',
      description: 'Up to 50% off on selected meals and combos.',
    },
    {
      id: 3,
      icon: <FaGift size={40} className="text-lime-500" />, // Icon for Gifts
      title: 'Today’s Deals',
      description: 'Unwrap daily deals and limited-time offers.',
    },
    {
      id: 4,
      icon: <FaFire size={40} className="text-lime-500" />, // Icon for Hot Deals
      title: 'Hot & Trending',
      description: 'Popular choices everyone’s craving.',
    },
    {
      id: 5,
      icon: <FaShoppingBag size={40} className="text-lime-500" />, // Icon for New Arrivals
      title: 'New Arrivals',
      description: 'Discover the latest additions to your favorite cuisines.',
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Explore</h2>

        {/* Explore Cards */}
        <div className="grid grid-cols-5 gap-2 md:gap-8">
          {exploreItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg cursor-pointer hover:shadow-md shadow-md p-2 md:p-6 flex flex-col items-center text-center"
            >
              <div className="md:mb-4 mb-1 w-5 flex items-center justify-around md:w-full">{item.icon}</div>
              <h3 className="md:text-lg text-sm font-medium text-gray-700 mb-2">{item.title}</h3>
              <p className="text-gray-500 hidden md:block">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
