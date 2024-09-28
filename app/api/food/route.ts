import { getMenuItemByIdController } from "@/server/controllers/menuItemController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }
  const menuItem = await getMenuItemByIdController(id);
  return NextResponse.json(menuItem);
}