import { NextResponse } from 'next/server';
import { registerUser } from '@/server/controllers/userController';
import { auth } from '@/server/lib/firebase';
import { PhoneAuthProvider, signInWithCredential, RecaptchaVerifier, ApplicationVerifier, getAuth } from 'firebase/auth';

export async function POST(request: Request) {
  try {
    const { name, email, phone, verificationId, otp } = await request.json();

    // Verify OTP with Firebase
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    const result = await signInWithCredential(auth, credential);

    if (!result.user) {
      throw new Error('OTP verification failed');
    }

    const user = await registerUser({ name, email, phone });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error: unknown) {
    console.error('Registration error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
  }
}


export async function GET(request: Request) {
  try {
    const { phone } = await request.json();
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(phone, new RecaptchaVerifier(auth, 'recaptcha-container'));
    return NextResponse.json({ verificationId }, { status: 200 });
  } catch (error: unknown) {
    console.error('OTP sending error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
  }
}