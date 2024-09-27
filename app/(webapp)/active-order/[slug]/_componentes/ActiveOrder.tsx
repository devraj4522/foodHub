"use client";

import React, { useState, useEffect } from 'react';
import { FaShoppingBag, FaMotorcycle, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Progress } from "@nextui-org/progress";
import { FaPhone, FaMoneyBillWave, FaMobileAlt } from 'react-icons/fa';
import { IOrder } from '@/types/Order';
import { PaymentStatus } from '@/types/Order';

// Mock data for active order
const mockActiveOrder = {
  id: 1,
  items: [
    { name: 'Burger', price: 250, quantity: 1 },
    { name: 'Fries', price: 100, quantity: 1 },
  ],
  total: 350,
  isPaid: false,
  estimatedDeliveryTime: 50, // in minutes
  orderPlacedTime: new Date(Date.now() - 10 * 60000), // 10 minutes ago
};

const ActiveOrderPageComponent: React.FC<{order: IOrder}> = ({order}) => {
  const [remainingTime, setRemainingTime] = useState(new Date(order.createdAt).getTime() + 50 * 60 * 1000);
  const [orderProgress, setOrderProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedTime = (Date.now() - mockActiveOrder.orderPlacedTime.getTime()) / 60000;
      const newRemainingTime = Math.max(0, mockActiveOrder.estimatedDeliveryTime - elapsedTime);
      setRemainingTime(Math.round(newRemainingTime));
      setOrderProgress((elapsedTime / mockActiveOrder.estimatedDeliveryTime) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderOrderStatus = () => {
    if (orderProgress < 33) {
      return (
        <div className="flex items-center text-orange-500">
          <FaShoppingBag className="mr-2" /> Order Placed
        </div>
      );
    } else if (orderProgress < 66) {
      return (
        <div className="flex items-center text-lime-500">
          <FaMotorcycle className="mr-2" /> On the Way
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-green-500">
          <FaMapMarkerAlt className="mr-2" /> Arriving Soon
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-lime-600">Active Order</h1>
      
      <Card className="mb-8">
        <CardHeader className="flex justify-between items-center">
          <span className="text-xl font-semibold" data-id={order.id}>Order #{order.id.slice(-6)}</span>
          {renderOrderStatus()}
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <Progress 
              className="mb-2"
              color="success"
              value={orderProgress} 
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Order Placed</span>
              <span>On the Way</span>
              <span>Delivered</span>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-2xl font-bold mb-2">
              {remainingTime > 0 ? `${remainingTime} minutes` : "Arriving any moment!"}
            </p>
            <p className="text-gray-600">Estimated delivery time</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Order Details</h3>
            {order?.items.map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <span>{item.quantity}x {item.menuItem.name}</span>
                <span>₹{item.menuItem.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-2 pt-2 border-t">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-semibold mr-2">Payment Method:</span>
              {order.paymentStatus === PaymentStatus.COMPLETED ? (
                <div className="flex items-center text-green-500">
                  <FaCheckCircle className="mr-1" />
                  <span>Paid</span>
                </div>
              ) : (
                <div className="flex items-center text-orange-500">
                  {order.paymentMethod === 'upi' ? (
                    <>
                      <FaMobileAlt className="mr-1" />
                      <span>UPI</span>
                    </>
                  ) : (
                    <>
                      <FaMoneyBillWave className="mr-1" />
                      <span>{order.paymentMethod.toUpperCase()}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

        <Button 
          className="w-full text-white bg-lime-600 hover:bg-lime-700"
          size="lg" 
          startContent={<FaPhone />}
        >
          Call Delivery 
        </Button>
    </div>
  );
};

export default ActiveOrderPageComponent;