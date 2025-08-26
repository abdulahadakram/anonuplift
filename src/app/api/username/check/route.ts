import { NextRequest, NextResponse } from 'next/server';
import { checkUsernameAvailability } from '@/lib/firebase';
import { usernameSchema } from '@/lib/validation';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { success: false, error: 'Username parameter is required' },
        { status: 400 }
      );
    }

    // Validate username format
    const validationResult = usernameSchema.safeParse(username);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid username format' },
        { status: 400 }
      );
    }

    // Check availability
    const isAvailable = await checkUsernameAvailability(username);

    return NextResponse.json({
      success: true,
      available: isAvailable,
      username
    });

  } catch (error) {
    console.error('Username availability check failed:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
