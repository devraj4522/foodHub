import { Suspense } from "react";
import ActiveOrderPageComponent from "./_componentes/ActiveOrder";

import { getOrderById } from "@/actions/order";

export default async function ActiveOrderPage({params}: {params: {slug: string}}) {
  const {slug} = params;
  const order = await getOrderById(slug);

  return(
    <Suspense fallback={<div className='w-screen h-screen justify-center items-center' > 
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>}>
      <ActiveOrderPageComponent order={order} />
    </Suspense>
  );
}

