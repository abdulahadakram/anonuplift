import { NextRequest, NextResponse } from 'next/server';
import { fixUsernameData } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;
    
    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }
    
    console.log('Attempting to fix username data for:', username);
    
    const result = await fixUsernameData(username);
    
    if (result) {
      return NextResponse.json({
        success: true,
        message: 'Username data fixed successfully'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to fix username data'
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Error fixing username data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

