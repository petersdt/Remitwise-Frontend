import { getSessionFromRequest } from '@/lib/auth/session';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session?.publicKey) {
    return Response.json(
      { error: 'Unauthorized', message: 'Not authenticated' },
      { status: 401 }
    );
  }
  return Response.json({ address: session.publicKey });
}
