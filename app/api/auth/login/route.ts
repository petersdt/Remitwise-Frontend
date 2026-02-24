import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const { publicKey, signature } = await request.json();
  // TODO: Verify signature against nonce
  // TODO: Create session in database
  
  const cookieStore = await cookies();
  cookieStore.set('session', publicKey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
  
  return NextResponse.json({ success: true });
}
