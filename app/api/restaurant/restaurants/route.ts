import { NextResponse } from "next/server";
import { getAllRestaurantsController } from "@/server/controllers/restaurantController";

export async function GET(request: Request) {
  try {
    const data = await getAllRestaurantsController()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "error" }, { status: 500 })
  }
}