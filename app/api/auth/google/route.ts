/**
 * Google Authentication Endpoint
 * POST /api/auth/google
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyGoogleToken, createJWT, setSessionCookie } from '@/lib/cms/auth';
import { createSession } from '@/lib/cms/redis';
import { createAuditLog } from '@/lib/cms/audit';

export async function POST(request: NextRequest) {
  const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    const { idToken } = await request.json();
    
    if (!idToken) {
      return NextResponse.json(
        { error: 'ID token is required' },
        { status: 400 }
      );
    }
    
    const user = await verifyGoogleToken(idToken);
    
    if (!user) {
      // Log failed login attempt
      await createAuditLog(
        { email: 'unknown', name: 'Unknown', role: 'author' },
        'login_failed',
        {
          metadata: { reason: 'Invalid token or unauthorized domain' },
          ipAddress,
          userAgent,
        }
      );
      
      return NextResponse.json(
        { error: 'Invalid token or unauthorized domain' },
        { status: 401 }
      );
    }
    
    const token = await createJWT(user);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    
    const session = {
      user,
      token,
      expiresAt,
    };
    
    await createSession(session);
    await setSessionCookie(token);
    
    // Log successful login
    await createAuditLog(user, 'login', {
      metadata: { sessionExpires: expiresAt },
      ipAddress,
      userAgent,
    });
    
    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
