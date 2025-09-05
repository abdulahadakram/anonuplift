import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername } from '@/lib/firebase';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { success: false, error: 'Username is required' },
        { status: 400 }
      );
    }

    // Get user by username
    const user = await getUserByUsername(username);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Return only public user information
    const publicUser = {
      username: username, // Use the username from the URL params
      uid: user.uid,
      // Don't expose sensitive information like email, etc.
    };

    return NextResponse.json({
      success: true,
      data: publicUser
    });

  } catch (error) {
    console.error('Failed to fetch user:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
