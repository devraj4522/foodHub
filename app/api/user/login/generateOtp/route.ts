import { NextRequest, NextResponse } from 'next/server';
import { generateOtpController } from '@/server/controllers/userController';
import { getUserByPhoneNumber } from '@/server/services/userService';

export async function POST(request: NextRequest) {
  const { phone } = await request.json();
  try {
    const result = await generateOtpController(phone);
    

    return NextResponse.json({ message: 'OTP generated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate OTP' }, { status: 500 });
  }
}
