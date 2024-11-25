import { NextResponse, NextRequest } from "next/server";
import { getRestaurantByIdController } from "@/server/controllers/restaurantController";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const data = await getRestaurantByIdController(slug);
    if (!data) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    // console.error("Error in GET /api/restaurant:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}