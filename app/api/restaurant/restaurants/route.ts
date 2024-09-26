import { NextResponse, NextRequest } from "next/server";
import { getAllRestaurantsController } from "@/server/controllers/restaurantController";

export async function GET() {
  try {
    const data = await getAllRestaurantsController()
    return NextResponse.json(data)
  } catch (error) {
    console.log("error in getAllRestaurantsController", error)
    return NextResponse.json({ error: "error" }, { status: 500 })
  }
}