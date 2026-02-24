import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';

async function handler(request: NextRequest, session: string) {
  const body = await request.json();
  // TODO: Call Soroban remittance_split contract
  return NextResponse.json({ success: true });
}

export const POST = withAuth(handler);
