import { Suspense } from "react";
import ActiveOrderPageComponent from "./_componentes/ActiveOrder";

import { getOrderById } from "@/actions/order";

export default async function ActiveOrderPage({params}: {params: {slug: string}}) {
  const {slug} = params;
  const order = await getOrderById(slug);

  return(
    <Suspense fallback={<div>Loading...</div>}>
      <ActiveOrderPageComponent order={order} />
    </Suspense>
  );
}

