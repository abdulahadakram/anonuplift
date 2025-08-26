import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername, messagesCollection } from '@/lib/firebase';
import { verifyTurnstile } from '@/lib/turnstile';
import { checkRateLimit } from '@/lib/rate-limit';
import { containsProfanity, hashIP, hashUserAgent } from '@/lib/utils';
import { messageSubmissionSchema } from '@/lib/validation';
import { headers } from 'next/headers';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const headersList = headers();
    
    // Get client IP and user agent
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    // Parse and validate request body
    const body = await request.json();
    const validationResult = messageSubmissionSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    const { category, body: messageBody, turnstileToken } = validationResult.data;

    // Verify Turnstile captcha only if token is provided
    if (turnstileToken) {
      const isCaptchaValid = await verifyTurnstile(turnstileToken, ip);
      if (!isCaptchaValid) {
        return NextResponse.json(
          { success: false, error: 'Captcha verification failed' },
          { status: 400 }
        );
      }
    }

    // Get user by username
    const user = await getUserByUsername(username);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Get the UID - it should be in the user document
    const recipientUid = user.uid;
    
    if (!recipientUid) {
      console.error('No UID found in user document:', user);
      return NextResponse.json(
        { success: false, error: 'Invalid user data' },
        { status: 500 }
      );
    }

    // Check profanity
    if (containsProfanity(messageBody)) {
      return NextResponse.json(
        { success: false, error: 'Message contains inappropriate content' },
        { status: 400 }
      );
    }

    // Rate limiting by IP + username
    const rateLimitKey = `message:${ip}:${username}`;
    const rateLimitResult = await checkRateLimit(rateLimitKey);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded. Please wait before sending another message.',
          resetTime: rateLimitResult.resetTime
        },
        { status: 429 }
      );
    }

    // Create message document
    const messageData = {
      recipientId: recipientUid,
      category,
      content: messageBody,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
      reported: false,
      ipHash: hashIP(ip),
      uaHash: hashUserAgent(userAgent),
    };

    // Add to Firestore
    const messageRef = await messagesCollection.add(messageData);
    
    // Update the document with the generated ID
    await messageRef.update({ id: messageRef.id });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      messageId: messageRef.id
    });

  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
