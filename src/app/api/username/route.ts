import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { reserveUsername, checkUsernameAvailability } from '@/lib/firebase';
import { usernameSchema } from '@/lib/validation';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { success: false, error: 'Username is required' },
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

    // Check if username is available
    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
      return NextResponse.json(
        { success: false, error: 'Username is already taken' },
        { status: 409 }
      );
    }

    // Reserve username and create user document
    await reserveUsername(username, session.user.id);

    return NextResponse.json({
      success: true,
      message: 'Username set successfully',
      username
    });

  } catch (error) {
    console.error('Username reservation failed:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
