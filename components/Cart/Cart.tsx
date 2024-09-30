"use client";
import React, { useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { showCartAtom } from '@/recoil/atoms/cartAtom';
import { cartAtom } from '@/recoil/atoms/cartAtom';
import { toast } from 'sonner';
import {ICartState} from '@/types/Cart'
import { updateCartItem } from '@/actions/cart';
import CartSkeleton from './_components/CartSkeleton';
import Address from './_components/Address/Address';
import PaymentSelection from './_components/Payment/PaymentSection';
import { selectedAddressAtom } from '@/recoil/atoms/cartAtom';

const Cart: React.FC = () => {
  const [step, setStep] = useState<'cart' | 'address' | 'payment'>('cart');
  const [isCartVisible, setIsCartVisible] = useRecoilState(showCartAtom);
  const [cart, setCart] = useRecoilState(cartAtom);
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = cart?.items || [];
  const selectedAddress = useRecoilValue(selectedAddressAtom);

  const totalPrice = cartItems.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);

  const handleQuantityChange = useCallback((id: string, change: number) => {
    try{
      setIsLoading(true);
      setCart((prevCart: ICartState | null) => {
        if (!prevCart) return null;
        const updatedItems = prevCart.items.reduce((acc, item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + change);
            updateCartItem(id, { quantity: newQuantity });
            if (newQuantity > 0) {
              acc.push({ ...item, quantity: newQuantity });
            }
          } else {
            acc.push(item);
          }
          return acc;
        }, [] as ICartState['items']);
        return { ...prevCart, items: updatedItems };
      });
    }
    catch (error)
    {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart. Please try again.");
    }
    finally
    {
      setIsLoading(false);
    }

  }, [setCart]);

  const renderCartItems = useCallback(() => (
    <Card className="mb-4 shadow-md">
      <CardHeader className="flex gap-3 bg-black text-white">
        <FaShoppingCart size={20} />
        <h2 className="text-lg font-semibold">Your Cart</h2>
      </CardHeader>
      <CardBody className="max-h-[60vh] overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="text-center">Updating cart...</div>
        ) : cartItems.filter(item => item.quantity > 0).length > 0 ? (
          cartItems.filter(item => item.quantity > 0).map((item: any, index: number) => (
            <div key={item.id} className="flex justify-between items-center mb-3 py-2 border-b">
              <span className="font-medium">{item.menuItem.name}</span>
              <div className="flex items-center">
                <Button size="sm" isIconOnly className="bg-gray-200 text-gray-700 min-w-8 h-8" onPress={() => handleQuantityChange(item.id, -1)} disabled={isLoading}>-</Button>
                <span className="mx-3 font-semibold">{item.quantity}</span>
                <Button size="sm" isIconOnly className="bg-gray-200 text-gray-700 min-w-8 h-8" onPress={() => handleQuantityChange(item.id, 1)} disabled={isLoading}>+</Button>
                <span className="ml-4 font-semibold">₹{(item.menuItem.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">Your cart is empty</div>
        )}
        <div className="font-bold mt-4 text-right text-lg">Total: ₹{totalPrice.toFixed(2)}</div>
      </CardBody>
    </Card>
  ), [cartItems, handleQuantityChange, isLoading]);

  const handleOutsideClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsCartVisible(false);
    }
  }, [setIsCartVisible]);

  return (
    <AnimatePresence>
      {isCartVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleOutsideClick}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full md:w-96 p-4 bg-white  min-h-[80vh] overflow-hidden fixed top-0 right-0 overflow-y-auto z-40"
            style={{
              boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px'
            }}
          >
            {isLoading? <CartSkeleton/> : (
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
                  <Address />
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
                  <PaymentSelection />
                </>
              )}
            </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
