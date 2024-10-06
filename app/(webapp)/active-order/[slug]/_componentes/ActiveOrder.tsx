"use client";

import React, { useState, useEffect } from 'react';
import { FaShoppingBag, FaMapMarkerAlt, FaCheckCircle, FaUtensils, FaTruck, FaTimesCircle } from 'react-icons/fa';
import { FaPhone, FaMoneyBillWave, FaMobileAlt } from 'react-icons/fa';

import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Progress } from "@nextui-org/progress";

import { IOrder, OrderStatus, PaymentStatus } from '@/types/Order';

const ActiveOrderPageComponent: React.FC<{order: IOrder}> = ({order}) => {
  const [remainingTime, setRemainingTime] = useState(50);
  const [orderProgress, setOrderProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedTime = (new Date().getTime() - new Date(order.createdAt).getTime()) / 60000;
      const newRemainingTime = Math.max(0, 50 - elapsedTime);
      setRemainingTime(Math.round(newRemainingTime));
      setOrderProgress((elapsedTime / 50) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderOrderStatus = () => {
    switch (order.orderStatus) {
      case OrderStatus.PLACED:
        return (
          <div className="flex items-center text-green-600">
            <FaShoppingBag className="mr-2" /> Order Placed
          </div>
        );
      case OrderStatus.PREPARING:
        return (
          <div className="flex items-center text-yellow-500">
            <FaUtensils className="mr-2" /> Preparing
          </div>
        );
      case OrderStatus.OUT_FOR_DELIVERY:
        return (
          <div className="flex items-center text-yellow-700">
            <FaTruck className="mr-2" /> Out for Delivery
          </div>
        );
      case OrderStatus.DELIVERED:
        return (
          <div className="flex items-center text-green-500">
            <FaCheckCircle className="mr-2" /> Delivered
          </div>
        );
      case OrderStatus.CANCELLED:
        return (
          <div className="flex items-center text-red-500">
            <FaTimesCircle className="mr-2" /> Cancelled
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-500">
            <FaMapMarkerAlt className="mr-2" /> Check Status
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="md:block hidden md:text-3xl font-bold mb-8 text-gray-800">Active Order</h1>
      
      <Card className="mb-8">
        <CardHeader className="flex justify-between items-center">
          <span className="text-base md:text-xl font-semibold" data-id={order.id}>Order #{order.id.slice(-6)}</span>
          {renderOrderStatus()}
        </CardHeader>
        <CardBody>
          {(order.orderStatus === OrderStatus.PLACED || order.orderStatus === OrderStatus.PREPARING || order.orderStatus === OrderStatus.OUT_FOR_DELIVERY) && (
            <>
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
        </>
          )}
          
          

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
                <div className="flex items-center text-green-600">
                  <FaCheckCircle className="mr-1" />
                  <span>Paid</span>
                </div>
              ) : (
                <div className="flex items-center text-yellow-700">
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
          className="w-full text-white bg-green-600 hover:bg-green-700"
          size="lg" 
          startContent={<FaPhone />}
        >
          Call Delivery 
        </Button>
    </div>
  );
};

export default ActiveOrderPageComponent;