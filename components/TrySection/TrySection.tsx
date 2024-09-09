// app/components/YouCanTrySection.tsx

import Link from "next/link";

export default function YouCanTrySection() {
  const items = [
    { id: 1, name: 'Dosha', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Dosa.png' },
    { id: 2, name: 'Biryani', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Biryani.png' },
    
    { id: 3, name: 'Rasmalai', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Rasgulla.png' },
    
    { id: 4, name: 'Burger', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Jalebi.png' },
    
    { id: 5, name: 'Paneer', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pure%20Veg.png' },
    
    { id: 6, name: 'Rolls', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Rolls.png' },
    
    { id: 7, name: 'Pizza', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pizza.png' },
    
    { id: 8, name: 'Rasgoola', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Rasgulla.png' },
    
    { id: 9, name: 'Chole Bhature', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Chole%20Bhature.png' },

    { id: 10, name: 'Cake', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Cake.png' },

    { id: 11, name: 'Paratha', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Paratha.png' },

    { id: 11, name: 'Pav Bhaji', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pav%20Bhaji.png' },

    { id: 11, name: 'Idli', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Idli.png' },

    { id: 11, name: 'Pastry', image: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pastry.png' },

  ];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">You Can Try</h2>

        {/* Scrollable container */}
        <div className="flex  space-x-4 no-scrollbar">
          <div className="flex justify-around  flex-wrap md:gap-4 gap-1">
            {items.map((item) => (
              <Link key={item.id} className="flex-shrink-0 w-16 md:w-40 text-center" href={""}>
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
