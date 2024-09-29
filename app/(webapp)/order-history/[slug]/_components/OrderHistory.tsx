"use client";
import React, { useState } from 'react';
import { FaShoppingBag, FaCalendarAlt, FaHistory, FaReceipt, FaUtensils, FaTruck, FaPercent } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { IOrder } from '@/types/Order';


const OrderHistory = ({orders}: {orders: IOrder[]}) => {

  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const todayOrders = orders?.filter((order: IOrder) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  });
  const pastOrders = orders?.filter((order: IOrder) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return orderDate.toDateString() !== today.toDateString();
  });


  const handleOrderClick = (order: IOrder) => {
    setSelectedOrder(order);
    onOpen();
  };

  const renderOrderCard = (order: IOrder, index: number) => (
    <Card 
      className="mb-4 cursor-pointer w-full hover:bg-gray-100"

      isPressable
      key={index} 
      onPress={() => handleOrderClick(order)}
    >

      <CardHeader className="flex mb-0 pb-0 justify-between items-center">
        <span className="text-lg font-semibold pt-2">Order #{order.id.slice(-4).toUpperCase()}</span>
        <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
      </CardHeader>
      <CardBody className='pt-0'>
        <p className="text-right font-bold">Total: ₹{order.totalAmount}</p>
      </CardBody>
    </Card>
  );

  const renderDetailedBill = (order: IOrder) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>
      <p className="text-gray-600 mb-4">{new Date(order.createdAt).toLocaleDateString()}</p>
      <div className="mb-6">
        <h3 className="font-semibold mb-2 flex items-center text-lg">
          <FaUtensils className="mr-2" /> Items
        </h3>
        { order.items && order.items.length > 0 ? order.items.map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b">
            <span>{item.menuItem.name}</span>
            <span>₹{item.price}</span>
          </div>
        )) : <p>No items in this order.</p>}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between py-2">
          <span>Subtotal</span>
          <span>₹{order.totalAmount}</span>
        </div>
        {/* <div className="flex justify-between py-2">
          <span className="flex items-center"><FaTruck className="mr-2" /> Delivery Fee</span>
          <span>₹{order.deliveryFee.toFixed(2)}</span>
        </div> */}
        {/* <div className="flex justify-between py-2">
          <span>Tax</span>
          <span>₹{(order.totalAmount*0.18).toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 text-green-600">
          <span className="flex items-center"><FaPercent className="mr-2" /> Discount</span>
          <span>-₹10</span>
        </div> */}
      </div>
      
      <div className="flex justify-between font-bold text-xl pt-4 border-t">
        <span>Total</span>
        <span>₹{(order.totalAmount).toFixed(2)}</span>
      </div>
    </div>
  );

 

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-lime-600">Order History</h1>
      
      <Tabs aria-label="Order history tabs">
      <Tab key="today" title={<div className="flex items-center"><FaCalendarAlt className="mr-2" />Today&apos;s Orders</div>}>
          <div className="mt-4">
            {todayOrders && todayOrders.length > 0 ? todayOrders.map(renderOrderCard) : <p>No orders for today.</p>}
          </div>
        </Tab>
       
        <Tab key="past" title={<div className="flex items-center"><FaHistory className="mr-2" />Past Orders</div>}>
          <div className="mt-4">
            {pastOrders && pastOrders.length > 0 ? pastOrders.map(renderOrderCard) : <p>No orders for today.</p>}
          </div>
        </Tab>

        <Tab key="all" title={<div className="flex items-center"><FaShoppingBag className="mr-2" />All Orders</div>}>
          <div className="mt-4">
            {orders && orders.length > 0 ? orders.map(renderOrderCard) : <p>No orders found.</p>}
          </div>
        </Tab>
        
      </Tabs>

      <Modal 
        isOpen={isOpen}
        placement='center'
        onOpenChange={onOpenChange}
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Your Bill</ModalHeader>
              <ModalBody>
                {selectedOrder && renderDetailedBill(selectedOrder)}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" startContent={<FaReceipt />}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OrderHistory;