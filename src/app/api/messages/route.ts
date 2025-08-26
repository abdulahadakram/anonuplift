import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const updateMessageSchema = z.object({
  messageId: z.string(),
  deleted: z.boolean().optional(),
  reported: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500 }
      );
    }

    // Get messages for the authenticated user
    const messagesRef = db.collection('messages');
    console.log( "session.user.id", session.user.id);
    const query = messagesRef
      .where('recipientId', '==', session.user.id);

    const snapshot = await query.get();
    const messages = snapshot.docs
      .map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter((message: any) => !message.deleted) // Filter deleted messages in memory
      .sort((a: any, b: any) => {
        // Sort by createdAt in descending order in memory
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

    return NextResponse.json({
      success: true,
      messages,
      count: messages.length
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    const validatedData = updateMessageSchema.parse(body);

    // Get the message to verify ownership
    const messageRef = db.collection('messages').doc(validatedData.messageId);
    const messageDoc = await messageRef.get();

    if (!messageDoc.exists) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    const messageData = messageDoc.data();
    if (messageData?.recipientId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Update the message
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (validatedData.deleted !== undefined) {
      updateData.deleted = validatedData.deleted;
    }

    if (validatedData.reported !== undefined) {
      updateData.reported = validatedData.reported;
    }

    await messageRef.update(updateData);

    return NextResponse.json({
      success: true,
      message: 'Message updated successfully'
    });

  } catch (error) {
    console.error('Error updating message:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
