import React from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { Button } from "@nextui-org/button";
import { FaShoppingCart, FaMapMarkerAlt, FaWallet } from 'react-icons/fa';

const CartSkeleton = () => {
  return (
    <div className="w-full md:w-96 p-4 bg-white min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="w-1/3 h-8 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>

        {/* Cart Items Skeleton */}
        <Card className="mb-4 shadow-md">
          <CardHeader className="flex gap-3 bg-black text-white">
            <FaShoppingCart size={20} />
            <h2 className="text-lg font-semibold">Your Cart</h2>
          </CardHeader>
          <CardBody className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex justify-between items-center mb-3 py-2 border-b">
                <Skeleton className="w-1/3 h-6 rounded-lg" />
                <div className="flex items-center">
                  <Skeleton className="w-8 h-8 rounded-lg mr-3" />
                  <Skeleton className="w-8 h-8 rounded-lg mr-3" />
                  <Skeleton className="w-8 h-8 rounded-lg mr-3" />
                  <Skeleton className="w-16 h-6 rounded-lg" />
                </div>
              </div>
            ))}
            <div className="font-bold mt-4 text-right text-lg">
              <Skeleton className="w-1/3 h-6 rounded-lg ml-auto" />
            </div>
          </CardBody>
        </Card>

        {/* Address Selection Skeleton */}
        <Card className="mb-4 shadow-md">
          <CardHeader className="flex gap-3 bg-black text-white">
            <FaMapMarkerAlt size={20} />
            <h2 className="text-lg font-semibold">Delivery Address</h2>
          </CardHeader>
          <CardBody>
            <Skeleton className="w-full h-10 rounded-lg" />
          </CardBody>
        </Card>

        {/* Payment Selection Skeleton */}
        <Card className="mb-4 shadow-md">
          <CardHeader className="flex gap-3 bg-black text-white">
            <FaWallet size={20} />
            <h2 className="text-lg font-semibold">Payment Method</h2>
          </CardHeader>
          <CardBody>
            <Skeleton className="w-full h-10 rounded-lg mb-4" />
            <Skeleton className="w-full h-40 rounded-lg" />
          </CardBody>
        </Card>

        <Skeleton className="w-full h-12 rounded-lg" />
      </div>
    </div>
  );
};

export default CartSkeleton;
