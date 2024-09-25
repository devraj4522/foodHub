import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface PlacingOrderProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const PlacingOrder: React.FC<PlacingOrderProps> = ({ isLoading, isSuccess, isError }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isLoading || isSuccess || isError) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg text-center"
          >
            {isLoading && (
              <div className="flex flex-col items-center">
                <FaSpinner className="text-4xl text-lime-600 animate-spin mb-4" />
                <h2 className="text-2xl font-bold mb-4">Placing Your Order</h2>
                <p className="text-gray-600">Please wait while we process your order...</p>
              </div>
            )}
            {isSuccess && (
              <div className="flex flex-col items-center">
                <FaCheckCircle className="text-4xl text-green-500 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-600">Your delicious meal is on its way.</p>
              </div>
            )}
            {isError && (
              <div className="flex flex-col items-center">
                <FaTimesCircle className="text-4xl text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
                <p className="text-gray-600">We couldn't place your order. Please try again.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlacingOrder;

