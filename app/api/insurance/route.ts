import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';

async function getHandler(request: NextRequest, session: string) {
  // TODO: Fetch policies from Soroban insurance contract
  return NextResponse.json({ policies: [] });
}

async function postHandler(request: NextRequest, session: string) {
  const body = await request.json();
  // TODO: Create policy in Soroban insurance contract
  return NextResponse.json({ success: true });
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);
