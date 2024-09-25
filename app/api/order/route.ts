import { NextRequest, NextResponse } from "next/server";
import { getOrdersByUserIdController, getOrdersByStatusController, updateOrderController } from "@/server/controllers/orderController";
import { OrderStatus } from "@/types/Order";
import { getOrderByIdController } from "@/server/controllers/orderController";
export async function GET(req: NextRequest, res: NextResponse) {
    const userId = req.nextUrl.searchParams.get("userId");
    const status = req.nextUrl.searchParams.get("status") as OrderStatus;
    const orderId = req.nextUrl.searchParams.get("orderId");

   try {
    if (orderId) {
      const order = await getOrderByIdController(orderId);
      return NextResponse.json(order);
  } else if (userId && !status) {
      const order = await getOrdersByUserIdController(userId);
      return NextResponse.json(order);
  } else if (status && userId) {
      if (!Object.values(OrderStatus).includes(status)) {
          return NextResponse.json({ error: "Invalid order status" }, { status: 400 });
      }
      const order = await getOrdersByStatusController(status, userId);
      return NextResponse.json(order);
  } else {
      return NextResponse.json({ error: "No userId or status provided" }, { status: 400 });
  }
   } catch (error) {
      return NextResponse.json({error: "Error in fetching records: "})
   }
}


export async function PUT(req: NextRequest, res: NextResponse) {
    const { orderId, data } = await req.json();
    const order = await updateOrderController(orderId, data);
    return NextResponse.json(order);
}

