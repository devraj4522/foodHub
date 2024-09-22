import React from 'react';
import { Skeleton } from "@nextui-org/skeleton";
import { FaUser } from 'react-icons/fa';

export const Loading: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
    <Skeleton className="h-12 w-64 mb-8 rounded-lg" />
      
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-lime-300">
      <div className="p-6 bg-lime-50">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-lime-500 rounded-full flex items-center justify-center text-3xl text-white">
            <FaUser />
          </div>
          <div className="ml-6">
            <Skeleton className="h-8 w-48 mb-2 rounded-lg" />
            <Skeleton className="h-6 w-32 rounded-lg" />
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-4 rounded-lg" />
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="h-8 w-48 mb-4 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  </div>
  );
}

