'use client';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { FoodItem } from '@/types/Food';
import FoodItemDetails from './Food/FoodItemDetails';

const FoodItemDetailsClient: React.FC< { foodItem: FoodItem }> = ({ foodItem }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FoodItemDetails foodItem={foodItem} />
    </QueryClientProvider>
  );
};

export default FoodItemDetailsClient;