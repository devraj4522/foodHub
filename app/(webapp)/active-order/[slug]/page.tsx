
import { getOrderById } from "@/actions/order";
import ActiveOrderPageComponent from "./_componentes/ActiveOrder";

export default async function ActiveOrderPage({params}: {params: {slug: string}}) {
  const {slug} = params;

  const order = await getOrderById(slug);
  return <ActiveOrderPageComponent order={order} />;
}

