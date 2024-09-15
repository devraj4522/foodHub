"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { FaShoppingCart, FaMapMarkerAlt, FaWallet, FaArrowLeft } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useGeolocation } from "@/hooks/location/useGeolocation";
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { showCartAtom } from '@/recoil/atoms/cartAtom';
import { useGetCartItems } from '@/hooks/cart/useGetCart';
import { useUpdateCart } from '@/hooks/cart/useUpdateCart';
import { userAtom } from '@/recoil/atoms/userAtom';
import { cartItemsAtom } from '@/recoil/atoms/cartAtom';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('upi');
  const [step, setStep] = useState<'cart' | 'address' | 'payment'>('cart');
  const [isCartVisible, setIsCartVisible] = useRecoilState(showCartAtom);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const { updateCartItem, isSuccess, isLoading, error } = useUpdateCart();
  const { address } = useGeolocation();
  const user = useRecoilValue(userAtom);
  const [allAddresses, setAllAddresses] = useState<string[]>([]);
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  useEffect(() => {
    const addresses = address ? [address, ...user.address] : user.address;
    setAllAddresses(addresses);
    setSelectedAddress(addresses[0] || '');
  }, [user, address, step]);


  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddressChange = useCallback((address: string) => {
    setSelectedAddress(address);
  }, []);

  const handlePaymentMethodChange = useCallback((method: string) => {
    setPaymentMethod(method);
    setIsQRVisible(false);
  }, []);

  const handleCheckout = useCallback(() => {
    console.log("Proceeding to checkout");
    console.log("Order details:", {
      items: cartItems,
      totalPrice,
      address: selectedAddress,
      paymentMethod
    });
  }, [cartItems, totalPrice, selectedAddress, paymentMethod]);

  const handleQuantityChange = useCallback((id: string, change: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      updateCartItem(updatedItems);
      return updatedItems;
    });

    
  }, [setCartItems, updateCartItem]);

  useEffect(() => {
    if (error) {
      console.error("Error updating cart:", error);
      // Implement error handling, e.g., show an error message to the user
    }
  }, [error]);

  const renderCartItems = useCallback(() => (
    <Card className="mb-4 shadow-md">
      <CardHeader className="flex gap-3 bg-black text-white">
        <FaShoppingCart size={20} />
        <h2 className="text-lg font-semibold">Your Cart</h2>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <div className="text-center">Updating cart...</div>
        ) : cartItems.filter(item => item.quantity > 0).length > 0 ? (
          cartItems.filter(item => item.quantity > 0).map((item: CartItem) => (
            <div key={item.id} className="flex justify-between items-center mb-3 py-2 border-b">
              <span className="font-medium">{item.name}</span>
              <div className="flex items-center">
                <Button size="sm" isIconOnly className="bg-gray-200 text-gray-700 min-w-8 h-8" onPress={() => handleQuantityChange(item.id, -1)} disabled={isLoading}>-</Button>
                <span className="mx-3 font-semibold">{item.quantity}</span>
                <Button size="sm" isIconOnly className="bg-gray-200 text-gray-700 min-w-8 h-8" onPress={() => handleQuantityChange(item.id, 1)} disabled={isLoading}>+</Button>
                <span className="ml-4 font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">Your cart is empty</div>
        )}
        <div className="font-bold mt-4 text-right text-lg">Total: ₹{totalPrice.toFixed(2)}</div>
      </CardBody>
    </Card>
  ), [cartItems, handleQuantityChange, totalPrice, isLoading]);

  const renderAddressSelection = useCallback(() => (
    <Card className="mb-4 shadow-md">
      <CardHeader className="flex gap-3 bg-black text-white">
        <FaMapMarkerAlt size={20} />
        <h2 className="text-lg font-semibold">Delivery Address</h2>
      </CardHeader>
      <CardBody>
        <Select 
          label="Select Address" 
          placeholder="Choose an address"
          defaultSelectedKeys={[selectedAddress]}
          onChange={(e) => handleAddressChange(e.target.value)}
        >
          {allAddresses.length > 0 ? (
            allAddresses.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))
          ) : (
            <SelectItem key="no-addresses" value="">
              No saved addresses
            </SelectItem>
          )}
        </Select>
      </CardBody>
    </Card>
  ), [allAddresses, handleAddressChange, selectedAddress]);

  const renderPaymentSelection = useCallback(() => (
    <Card className="mb-4 shadow-md">
      <CardHeader className="flex gap-3 bg-black text-white">
        <FaWallet size={20} />
        <h2 className="text-lg font-semibold">Payment Method</h2>
      </CardHeader>
      <CardBody>
        <Select 
          label="Select Payment Method" 
          placeholder="Choose a payment method"
          onChange={(e) => handlePaymentMethodChange(e.target.value)}
          defaultSelectedKeys={["upi"]}
        >
          <SelectItem key="upi" value="upi">UPI</SelectItem>
          <SelectItem key="cod" value="cod">Cash on Delivery</SelectItem>
        </Select>
        {paymentMethod === 'upi' && (
          <div className="mt-4">
            <p className="mb-2">Pay using UPI</p>
            <div className="relative">
              <Image
                src="https://pngimg.com/uploads/qr_code/qr_code_PNG14.png"
                alt="UPI QR Code"
                width={200}
                height={200}
                className={`w-full h-full object-contain ${isQRVisible ? "" : "blur-[10px] bg-white"}`}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              />
              {!isQRVisible && (
                <Button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white"
                  onClick={() => setIsQRVisible(true)}
                >
                  Scan to Pay
                </Button>
              )}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  ), [paymentMethod, handlePaymentMethodChange, isQRVisible]);

  return (
    <AnimatePresence>
      {isCartVisible && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full md:w-96 p-4 bg-white min-h-screen fixed top-0 right-0 overflow-y-scroll z-40"
          style={{
            boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px'
          }}
        >
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-black">Your Order</h1>
              <Button
                isIconOnly
                className="bg-transparent p-0"
                onClick={() => setIsCartVisible(false)}
              >
                <IoMdClose className="text-black" size={28} />
              </Button>
            </div>
            {step !== 'cart' && (
              <Button
                className="mb-4 bg-black text-white"
                onClick={() => setStep(step === 'payment' ? 'address' : 'cart')}
              >
                <FaArrowLeft className="mr-2" /> Back
              </Button>
            )}
            {step === 'cart' && (
              <>
                {renderCartItems()}
                <Button 
                  className="w-full bg-black text-white mb-4"
                  onClick={() => {
                    if (cartItems.some(item => item.quantity > 0)) {
                      setStep('address');
                    }
                  }}
                  disabled={!cartItems.some(item => item.quantity > 0)}
                >
                  Proceed to Address
                </Button>
              </>
            )}
            {step === 'address' && (
              <>
                {renderAddressSelection()}
                <Button 
                  className="w-full bg-black text-white mb-4"
                  onClick={() => {
                    if (selectedAddress) {
                      setStep('payment');
                    }
                  }}
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
                  className="w-full bg-black text-white"
                  onClick={handleCheckout}
                  disabled={!paymentMethod || (paymentMethod === 'upi' && !isQRVisible)}
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
