import { NextRequest, NextResponse } from "next/server";
import { createOrderController } from "@/server/controllers/orderController";

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json();
    const order = await createOrderController(data);
    // console.log(order);
    return NextResponse.json(order);
}