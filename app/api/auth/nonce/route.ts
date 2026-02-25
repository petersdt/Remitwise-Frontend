import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

/**
 * GET /api/auth/nonce
 * Generate a nonce for signature-based authentication
 * 
 * Query Parameters:
 * - address: Stellar address requesting the nonce
 */
export async function GET(request: NextRequest) {
    try {
        const address = request.nextUrl.searchParams.get('address');

        if (!address) {
            return NextResponse.json(
                { error: 'Missing required query parameter: address' },
                { status: 400 }
            );
        }

        // Validate Stellar address format (G + 55 alphanumeric characters)
        if (!/^G[A-Z0-9]{55}$/.test(address)) {
            return NextResponse.json(
                { error: 'Invalid Stellar address format' },
                { status: 400 }
            );
        }

        // Generate a random nonce
        const nonce = randomBytes(32).toString('hex');

        // TODO: Store nonce with expiration (e.g., 5 minutes) in cache/database
        // For now, just return it
        // In production:
        // await storeNonce(address, nonce, { expiresIn: 300 });

        return NextResponse.json({
            nonce,
            address,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        });
    } catch (error) {
        console.error('Error generating nonce:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
