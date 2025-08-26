import { NextRequest, NextResponse } from 'next/server';
import { fixUserDocuments } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('Attempting to fix all user documents...');
    
    const fixedCount = await fixUserDocuments();
    
    return NextResponse.json({
      success: true,
      message: `Fixed ${fixedCount} user documents`,
      fixedCount
    });
    
  } catch (error) {
    console.error('Error fixing user documents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

