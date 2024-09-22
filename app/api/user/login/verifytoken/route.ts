import { NextRequest, NextResponse } from "next/server";
import { getUserFromTokenController } from "../../../../../server/controllers/userController";

export async function GET(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 })
  }
  const {user} = await getUserFromTokenController(token)
  return NextResponse.json({ user }, { status: 200 })
}