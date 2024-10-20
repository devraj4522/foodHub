import { Suspense } from "react";
import OrderHistory from "./_components/OrderHistory";
import {getOrdersByUserId} from '@/actions/order'

const OrderHistoryPage = async ({params}: {params: {slug: string}}) => {
  const {slug} = params;
  const orderHistory = await getOrdersByUserId(slug);
  
  return (
    <Suspense fallback={<div className='w-screen h-screen justify-center items-center' > 
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>}>
        <OrderHistory orders={orderHistory}  />
      </Suspense>
  );
};

export default OrderHistoryPage;