/**
 * Session Endpoint
 * GET /api/auth/session
 */

import { NextResponse } from 'next/server';
import { getSessionFromCookie } from '@/lib/cms/auth';

export async function GET() {
  try {
    const session = await getSessionFromCookie();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      user: session.user,
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Session retrieval failed' },
      { status: 500 }
    );
  }
}
