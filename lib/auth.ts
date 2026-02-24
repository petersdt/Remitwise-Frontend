import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function getSession(request: NextRequest): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('session')?.value || null;
}

export async function requireAuth(request: NextRequest): Promise<string> {
  const session = await getSession(request);
  if (!session) {
    throw new ApiError(401, 'Unauthorized');
  }
  return session;
}

export function withAuth<T>(
  handler: (request: NextRequest, session: string, context?: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: T) => {
    try {
      const session = await requireAuth(request);
      return await handler(request, session, context);
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json({ error: error.message }, { status: error.status });
      }
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  };
}
