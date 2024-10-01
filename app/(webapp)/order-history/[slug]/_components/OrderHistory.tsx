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
        <span className="text-sm md:text-lg font-semibold pt-2">Order #{order.id.slice(-4).toUpperCase()}</span>
        <span className="text-xs md:text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
      </CardHeader>
      <CardBody className='pt-0'>
        <p className="text-right text-sm md:text-base font-bold">Total: ₹{order.totalAmount}</p>
      </CardBody>
    </Card>
  );

  const renderDetailedBill = (order: IOrder) => (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Order #{order.id}</h2>
      <p className="text-sm md:text-base text-gray-600 mb-4">{new Date(order.createdAt).toLocaleDateString()}</p>
      <div className="mb-6">
        <h3 className="font-semibold mb-2 flex items-center text-base md:text-lg">
          <FaUtensils className="mr-2" /> Items
        </h3>
        { order.items && order.items.length > 0 ? order.items.map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b text-sm md:text-base">
            <span>{item.menuItem.name}</span>
            <span>₹{item.price}</span>
          </div>
        )) : <p className="text-sm md:text-base">No items in this order.</p>}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between py-2 text-sm md:text-base">
          <span>Subtotal</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>
      
      <div className="flex justify-between font-bold text-lg md:text-xl pt-4 border-t">
        <span>Total</span>
        <span>₹{(order.totalAmount).toFixed(2)}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-2 md:px-4 py-4 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-gray-800">Order History</h1>
      
      <Tabs 
        aria-label="Order history tabs" 
        className="text-sm md:text-base"
        color="success"
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-green-500",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-green-500"
        }}
      >
        <Tab 
          key="today" 
          title={
            <div className="flex items-center">
              <FaCalendarAlt className="mr-1 md:mr-2" />
              <span className="hidden sm:inline">Today&apos;s Orders</span>
              <span className="sm:hidden">Today</span>
            </div>
          }
        >
          <div className="mt-4">
            {todayOrders && todayOrders.length > 0 ? todayOrders.map(renderOrderCard) : <p className="text-sm md:text-base">No orders for today.</p>}
          </div>
        </Tab>
       
        <Tab 
          key="past" 
          title={
            <div className="flex items-center">
              <FaHistory className="mr-1 md:mr-2" />
              <span className="hidden sm:inline">Past Orders</span>
              <span className="sm:hidden">Past</span>
            </div>
          }
        >
          <div className="mt-4">
            {pastOrders && pastOrders.length > 0 ? pastOrders.map(renderOrderCard) : <p className="text-sm md:text-base">No past orders.</p>}
          </div>
        </Tab>

        <Tab 
          key="all" 
          title={
            <div className="flex items-center">
              <FaShoppingBag className="mr-1 md:mr-2" />
              <span className="hidden sm:inline">All Orders</span>
              <span className="sm:hidden">All</span>
            </div>
          }
        >
          <div className="mt-4">
            {orders && orders.length > 0 ? orders.map(renderOrderCard) : <p className="text-sm md:text-base">No orders found.</p>}
          </div>
        </Tab>
      </Tabs>

      <Modal 
        isOpen={isOpen}
        placement='center'
        onOpenChange={onOpenChange}
        size="3xl"
        className="max-w-[95%] md:max-w-[90%]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg md:text-xl">Your Bill</ModalHeader>
              <ModalBody>
                {selectedOrder && renderDetailedBill(selectedOrder)}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className="text-sm md:text-base">
                  Close
                </Button>
                <Button color="success" startContent={<FaReceipt />} className="text-sm md:text-base">
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