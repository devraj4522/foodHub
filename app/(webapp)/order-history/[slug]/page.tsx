import OrderHistory from "./_components/OrderHistory";
import {getOrdersByUserId} from '@/actions/order'

const OrderHistoryPage = async ({params}: {params: {slug: string}}) => {
  const {slug} = params;
  const orderHistory = await getOrdersByUserId(slug);
  
  return (
      <OrderHistory orders={orderHistory}  />
  );
};

export default OrderHistoryPage;