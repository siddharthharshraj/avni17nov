/**
 * Session Endpoint (Proxy to Render Backend)
 * GET /api/auth/session
 * 
 * This endpoint proxies to the Render backend for authentication.
 * Kept for backward compatibility with existing frontend code.
 */

import { NextRequest, NextResponse } from 'next/server';

const AUTH_BACKEND_URL = process.env.AUTH_BACKEND_URL || 'https://avni-auth-backend.onrender.com';

export async function GET(request: NextRequest) {
  try {
    // Get cookie from request
    const cookie = request.cookies.get('cms_session');
    
    // Forward request to Render backend
    const response = await fetch(`${AUTH_BACKEND_URL}/auth/me`, {
      headers: {
        'Cookie': cookie ? `cms_session=${cookie.value}` : '',
      },
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Session proxy error:', error);
    return NextResponse.json(
      { error: 'Session retrieval failed' },
      { status: 500 }
    );
  }
}
