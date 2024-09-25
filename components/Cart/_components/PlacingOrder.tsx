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

  if (!showModal) return null;
  
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-8 rounded-xl shadow-2xl text-center w-11/12 max-w-md"
            style={{ position: 'relative', zIndex: 51 }}
          >
            {isLoading && (
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FaSpinner className="text-5xl text-lime-600 mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-3">Preparing Your Feast</h2>
                <p className="text-gray-600 mb-3">Our chefs are working their magic...</p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="h-2 bg-lime-500 rounded-full"
                />
              </div>
            )}
            {isSuccess && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex flex-col items-center"
              >
                <FaCheckCircle className="text-5xl text-green-500 mb-4" />
                <h2 className="text-2xl font-bold mb-3">Order Confirmed!</h2>
                <p className="text-gray-600 mb-3">Your culinary journey begins now.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white px-5 py-2 rounded-full font-semibold"
                  onClick={() => setShowModal(false)}
                >
                  Track My Order
                </motion.button>
              </motion.div>
            )}
            {isError && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex flex-col items-center"
              >
                <FaTimesCircle className="text-5xl text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-3">Oops! Kitchen Mishap</h2>
                <p className="text-gray-600 mb-3">We encountered a small hiccup. Let&apos;s try again!</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold"
                  onClick={() => setShowModal(false)}
                >
                  Retry Order
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlacingOrder;
