import { NextRequest, NextResponse } from 'next/server';
import { updateUserDetailsController, getUserById } from '../../../server/controllers/userController';
import { middleware } from '../../../middleware';
import { cookies } from 'next/headers';

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
    console.log("error in get request")
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {

  const userData = await request.json();

  try {
    const {user, token} = await updateUserDetailsController(userData);
    cookies().set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 1 week
      path: '/',
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user data' }, { status: 500 });
  }
}

