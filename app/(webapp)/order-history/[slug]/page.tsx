import { Suspense } from "react";
import OrderHistory from "./_components/OrderHistory";
import {getOrdersByUserId} from '@/actions/order'

const OrderHistoryPage = async ({params}: {params: {slug: string}}) => {
  const {slug} = params;
  const orderHistory = await getOrdersByUserId(slug);
  
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <OrderHistory orders={orderHistory}  />
      </Suspense>
  );
};

export default OrderHistoryPage;