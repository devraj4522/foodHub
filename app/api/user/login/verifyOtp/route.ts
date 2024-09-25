import { NextRequest, NextResponse } from 'next/server';
import { verifyOtpController, loginUser, registerUser } from '@/server/controllers/userController';
import { getUserByPhoneNumber } from '@/server/services/userService';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const { phone, otp } = await request.json();

  try {
    const isVerified = await verifyOtpController(phone, otp);
    if (isVerified) {
      const existingUser = await getUserByPhoneNumber(phone);
      let user, token;
      if (existingUser) {
        ({ user, token } = await loginUser(phone));
      } else {
        ({ user, token } = await registerUser({ phone, name: '' }));
      }
      // console.log(user);
      // Set the token in an HTTP-only cookie
      cookies().set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 1 week
        path: '/',
      });

      return NextResponse.json({ 
        message: existingUser ? 'OTP verified successfully' : 'User registered successfully', 
        user 
      });
    } else {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify OTP or register user' }, { status: 500 });
  }
}
