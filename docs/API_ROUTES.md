# API Routes Documentation

## Authentication

All API routes use cookie-based session authentication. The session cookie is set after successful login and verified on protected routes.

### Auth Middleware

The `withAuth` helper in `/lib/auth.ts` protects routes by:
1. Checking for a valid session cookie
2. Returning 401 if no session exists
3. Passing the session to the route handler

Usage:
```typescript
import { withAuth } from '@/lib/auth';

async function handler(request: NextRequest, session: string) {
  // Your logic here - session is guaranteed to exist
  return NextResponse.json({ data: 'protected' });
}

export const GET = withAuth(handler);
```

## Route Classification

### Public Routes (No Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/nonce` | Generate nonce for wallet signature |
| POST | `/api/auth/login` | Login with signed nonce |
| POST | `/api/auth/logout` | Clear session |

### Protected Routes (Authentication Required)

All protected routes return `401 Unauthorized` if no valid session exists.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile |
| POST | `/api/split` | Configure money split |
| GET | `/api/goals` | List savings goals |
| POST | `/api/goals` | Create savings goal |
| GET | `/api/bills` | List bills |
| POST | `/api/bills` | Create/pay bill |
| GET | `/api/insurance` | List insurance policies |
| POST | `/api/insurance` | Create insurance policy |
| GET | `/api/family` | List family members |
| POST | `/api/family` | Add family member |
| POST | `/api/send` | Send money transaction |

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Authentication Flow

1. **Request Nonce**: `POST /api/auth/nonce` with `{ publicKey }`
2. **Sign Nonce**: User signs nonce with wallet
3. **Login**: `POST /api/auth/login` with `{ publicKey, signature }`
4. **Session Cookie**: Server sets httpOnly session cookie
5. **Protected Requests**: Cookie automatically sent with requests
6. **Logout**: `POST /api/auth/logout` clears session

## Implementation Notes

- Session stored as httpOnly cookie for security
- Session value currently stores publicKey (TODO: use proper session ID)
- All protected routes use `withAuth` wrapper
- Signature verification not yet implemented (TODO)
- Session storage in database not yet implemented (TODO)
