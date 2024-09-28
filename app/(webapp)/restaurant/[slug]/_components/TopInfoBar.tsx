import { FaClock, FaTrain } from "react-icons/fa";

export const TopInfoBar = ({openingTime, closingTime}: {openingTime: string, closingTime: string}) => {
  return (
    <section className="bg-yellow-50 py-4 m-0">

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-row items-center justify-between h-full">
             <div className="flex items-center space-x-2 border-l-4 border-yellow-300 pl-4 py-2">
               <FaClock className="text-green-600 text-xl flex-shrink-0" />
               <span className="font-semibold text-xs sm:text-base">Delivery: {openingTime} - {closingTime}</span>
             </div>
             <div className="flex items-center space-x-2 border-l-4 border-yellow-300 pl-4 py-2">
               <FaTrain className="text-yellow-600 text-xl flex-shrink-0" />
               <span className="font-semibold text-xs sm:text-base">Fastest Delivery</span>
             </div>
           </div>
         </div>
       </section>
  )
}