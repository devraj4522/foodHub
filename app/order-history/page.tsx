"use client";
import React, { useState } from 'react';
import { FaShoppingBag, FaCalendarAlt, FaHistory, FaReceipt, FaUtensils, FaTruck, FaPercent } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";

// Mock data for orders with price breakup
const mockOrders = [
  { 
    id: 1, 
    date: '2023-06-15', 
    items: [
      { name: 'Burger', price: 250 },
      { name: 'Fries', price: 100 },
    ],
    subtotal: 350,
    tax: 35,
    deliveryFee: 50,
    discount: 20,
    total: 415
  },
  { 
    id: 2, 
    date: '2023-06-14', 
    items: [
      { name: 'Pizza', price: 400 },
      { name: 'Coke', price: 60 },
    ],
    subtotal: 460,
    tax: 46,
    deliveryFee: 60,
    discount: 30,
    total: 536
  },
  { 
    id: 3, 
    date: '2023-06-13', 
    items: [
      { name: 'Salad', price: 200 },
      { name: 'Sandwich', price: 180 },
    ],
    subtotal: 380,
    tax: 38,
    deliveryFee: 55,
    discount: 25,
    total: 448
  },
];

const OrderHistoryPage: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const todayOrders = mockOrders.filter(order => order.date === new Date().toISOString().split('T')[0]);
  const pastOrders = mockOrders.filter(order => order.date !== new Date().toISOString().split('T')[0]);

  const handleOrderClick = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    onOpen();
  };

  const renderOrderCard = (order: typeof mockOrders[0]) => (
    <Card 
      key={order.id} 
      className="mb-4 cursor-pointer w-full hover:bg-gray-100"
      isPressable
      onPress={() => handleOrderClick(order)}
    >
      <CardHeader className="flex mb-0 pb-0 justify-between items-center">
        <span className="text-lg font-semibold pt-2">Order #{order.id}</span>
        <span className="text-sm text-gray-500">{order.date}</span>
      </CardHeader>
      <CardBody className='pt-0'>
        <p className="text-right font-bold">Total: ₹{order.total}</p>
      </CardBody>
    </Card>
  );

  const renderDetailedBill = (order: typeof mockOrders[0]) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>
      <p className="text-gray-600 mb-4">{order.date}</p>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2 flex items-center text-lg">
          <FaUtensils className="mr-2" /> Items
        </h3>
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b">
            <span>{item.name}</span>
            <span>₹{item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between py-2">
          <span>Subtotal</span>
          <span>₹{order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="flex items-center"><FaTruck className="mr-2" /> Delivery Fee</span>
          <span>₹{order.deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Tax</span>
          <span>₹{order.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 text-green-600">
          <span className="flex items-center"><FaPercent className="mr-2" /> Discount</span>
          <span>-₹{order.discount.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex justify-between font-bold text-xl pt-4 border-t">
        <span>Total</span>
        <span>₹{order.total.toFixed(2)}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-lime-600">Order History</h1>
      
      <Tabs aria-label="Order history tabs">
        <Tab key="all" title={<div className="flex items-center"><FaShoppingBag className="mr-2" />All Orders</div>}>
          <div className="mt-4">
            {mockOrders.map(renderOrderCard)}
          </div>
        </Tab>
        <Tab key="today" title={<div className="flex items-center"><FaCalendarAlt className="mr-2" />Today's Orders</div>}>
          <div className="mt-4">
            {todayOrders.length > 0 ? todayOrders.map(renderOrderCard) : <p>No orders for today.</p>}
          </div>
        </Tab>
        <Tab key="past" title={<div className="flex items-center"><FaHistory className="mr-2" />Past Orders</div>}>
          <div className="mt-4">
            {pastOrders.map(renderOrderCard)}
          </div>
        </Tab>
      </Tabs>

      <Modal 
        isOpen={isOpen} 
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

export default OrderHistoryPage;