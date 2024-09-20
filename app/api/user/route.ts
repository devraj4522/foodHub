
import { NextRequest, NextResponse } from 'next/server';
import { registerUser, loginUser } from '@/server/controllers/userController';
import { middleware } from '../midleware';

export async function POST(request: NextRequest) {
  console.log('request', request);
  const { action, ...userData } = await request.json();

  try {
    if (action === 'signin') {
      const result = await registerUser(userData);
      return NextResponse.json(result);
    } else if (action === 'signup') {
      const result = await loginUser(userData);
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
