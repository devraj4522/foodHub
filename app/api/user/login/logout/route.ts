import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  cookies().delete('auth_token');
  return NextResponse.json({ message: 'Logged out successfully' });
}
