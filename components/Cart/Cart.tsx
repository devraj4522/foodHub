"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { FaShoppingCart, FaMapMarkerAlt, FaWallet, FaArrowLeft, FaTimes } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useGeolocation } from "@/hooks/location/useGeolocation";
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { showCartAtom } from '@/recoil/atoms/cartAtom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Address {
  id: number;
  label: string;
  fullAddress: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const { coordinates, error } = useGeolocation();
  const [currentAddress, setCurrentAddress] = useState<string>('');
  const [step, setStep] = useState<'cart' | 'address' | 'payment'>('cart');
  const [isCartVisible, setIsCartVisible] = useRecoilState(showCartAtom);

  useEffect(() => {
    // Fetch cart items from API or local storage
    const fetchedItems: CartItem[] = [
      { id: 1, name: "Pizza", price: 12.99, quantity: 2 },
      { id: 2, name: "Burger", price: 8.99, quantity: 1 },
    ];
    setCartItems(fetchedItems);

    // Fetch saved addresses
    const fetchedAddresses: Address[] = [
      { id: 1, label: "Home", fullAddress: "123 Main St, City, Country" },
      { id: 2, label: "Work", fullAddress: "456 Office Rd, City, Country" },
    ];
    setSavedAddresses(fetchedAddresses);

    // Fetch current address based on coordinates
    if (coordinates) {
      // This should be replaced with a real geocoding service
      setCurrentAddress(`Lat: ${coordinates.latitude}, Lng: ${coordinates.longitude}`);
    }
  }, [coordinates]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddressChange = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleCheckout = () => {
    // Implement checkout logic
    console.log("Proceeding to checkout");
  };

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const renderCartItems = () => (
    <Card className="mb-4 shadow-md">
      <CardHeader className="flex gap-3 bg-lime-600 text-white">
        <FaShoppingCart size={20} />
        <h2 className="text-lg font-semibold">Your Cart</h2>
      </CardHeader>
      <CardBody>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-3 py-2 border-b">
            <span className="font-medium">{item.name}</span>
            <div className="flex items-center">
              <Button size="sm" isIconOnly className="bg-gray-200 text-gray-700 min-w-8 h-8" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
              <span className="mx-3 font-semibold">{item.quantity}</span>
              <Button size="sm" isIconOnly className="bg-gray-200 text-gray-700 min-w-8 h-8" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
              <span className="ml-4 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
        <div className="font-bold mt-4 text-right text-lg">Total: ${totalPrice.toFixed(2)}</div>
      </CardBody>
    </Card>
  );

  const renderAddressSelection = () => (
    <Card className="mb-4 shadow-md">
      <CardHeader className="flex gap-3 bg-lime-600 text-white">
        <FaMapMarkerAlt size={20} />
        <h2 className="text-lg font-semibold">Delivery Address</h2>
      </CardHeader>
      <CardBody>
        <Select 
          label="Select Address" 
          placeholder="Choose an address"
          onChange={(e) => handleAddressChange(e.target.value)}
        >
          <SelectItem key="current" value="current">
            Current Location: {currentAddress}
          </SelectItem>
          {/* {savedAddresses.map((address) => (
            <SelectItem key={address.id} value={address.id.toString()}>
              {address.label}: {address.fullAddress}
            </SelectItem>
          ))} */}
        </Select>
      </CardBody>
    </Card>
  );

  const renderPaymentSelection = () => (
    <Card className="mb-4 shadow-md">
      <CardHeader className="flex gap-3 bg-lime-600 text-white">
        <FaWallet size={20} />
        <h2 className="text-lg font-semibold">Payment Method</h2>
      </CardHeader>
      <CardBody>
        <Select 
          label="Select Payment Method" 
          placeholder="Choose a payment method"
          onChange={(e) => handlePaymentMethodChange(e.target.value)}
        >
          <SelectItem key="gpay" value="gpay">Google Pay</SelectItem>
          <SelectItem key="paytm" value="paytm">Paytm</SelectItem>
          <SelectItem key="phonepe" value="phonepe">PhonePe</SelectItem>
        </Select>
        {paymentMethod && (
          <Input
            className="mt-4"
            type="text"
            label="Enter UPI ID"
            placeholder="yourname@upi"
          />
        )}
      </CardBody>
    </Card>
  );

  return (
    <AnimatePresence>
      {isCartVisible && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full md:w-96 p-4 bg-gray-100 min-h-screen fixed top-0 right-0 overflow-y-auto z-40"
          style={{
            boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px'
          }}
        >
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-lime-600">Your Order</h1>
              <Button
                isIconOnly
                className="bg-transparent p-0"
                onClick={() => setIsCartVisible(false)}
              >
                <IoMdClose className="text-lime-600" size={28} />
              </Button>
            </div>
            {step !== 'cart' && (
              <Button
                className="mb-4 bg-lime-600 text-white"
                onClick={() => setStep(step === 'payment' ? 'address' : 'cart')}
              >
                <FaArrowLeft className="mr-2" /> Back
              </Button>
            )}
            {step === 'cart' && (
              <>
                {renderCartItems()}
                <Button 
                  className="w-full bg-lime-600 text-white mb-4"
                  onClick={() => setStep('address')}
                >
                  Proceed to Address
                </Button>
              </>
            )}
            {step === 'address' && (
              <>
                {renderAddressSelection()}
                <Button 
                  className="w-full bg-lime-600 text-white mb-4"
                  onClick={() => setStep('payment')}
                  disabled={!selectedAddress}
                >
                  Proceed to Payment
                </Button>
              </>
            )}
            {step === 'payment' && (
              <>
                {renderPaymentSelection()}
                <Button 
                  className="w-full bg-lime-600 text-white"
                  onClick={handleCheckout}
                  disabled={!paymentMethod}
                >
                  Place Order
                </Button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
