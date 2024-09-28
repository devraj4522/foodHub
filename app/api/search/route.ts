import { NextResponse, NextRequest } from "next/server";
import { searchRestaurantsORMenuItemsController } from "@/server/controllers/restaurantController";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const query = searchParams.get('query')
  if (!query) {
    return NextResponse.json({ error: "query is required" }, { status: 400 })
  }
  
  const data = await searchRestaurantsORMenuItemsController(query)

  return NextResponse.json(data)
}

