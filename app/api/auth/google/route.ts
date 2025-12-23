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
      // Log failed login attempt (non-blocking)
      createAuditLog(
        { email: 'unknown', name: 'Unknown', role: 'author' },
        'login_failed',
        {
          metadata: { reason: 'Invalid token or unauthorized domain' },
          ipAddress,
          userAgent,
        }
      ).catch(err => console.warn('[CMS] Audit log failed:', err.message));
      
      return NextResponse.json(
        { error: 'Invalid token or unauthorized domain. Please use your @samanvayfoundation.org email.' },
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
    
    // Create session (non-blocking if Redis unavailable - JWT will work)
    await createSession(session).catch(err => 
      console.warn('[CMS] Session storage failed, using JWT-only mode:', err.message)
    );
    
    // Log successful login (non-blocking)
    createAuditLog(user, 'login', {
      metadata: { sessionExpires: expiresAt },
      ipAddress,
      userAgent,
    }).catch(err => console.warn('[CMS] Audit log failed:', err.message));
    
    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      user,
    });
    
    // Set session cookie in response headers
    response.cookies.set('cms_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });
    
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[CMS] Auth error:', errorMessage);
    
    return NextResponse.json(
      { 
        error: 'Authentication failed. Please try again.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
