import { NextRequest, NextResponse } from 'next/server';
import { updateUserDetailsController, getUserById } from '../../../server/controllers/userController';
import { middleware } from '../midleware';

export async function GET(request: NextRequest) {
  const middlewareResponse = await middleware(request);
  if (middlewareResponse instanceof NextResponse) {
    return middlewareResponse;
  }

  const userId = request.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await getUserById(userId);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const middlewareResponse = await middleware(request);
  if (middlewareResponse instanceof NextResponse) {
    return middlewareResponse;
  }

  const userData = await request.json();
  const phoneNumber = userData.phoneNumber;

  if (!phoneNumber) {
    return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
  }

  try {
    const updatedUser = await updateUserDetailsController(phoneNumber, userData);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user data' }, { status: 500 });
  }
}

