/**
 * Logout Endpoint
 * POST /api/auth/logout
 */

import { NextRequest, NextResponse } from 'next/server';
import { logout, getSessionFromCookie } from '@/lib/cms/auth';
import { createAuditLog } from '@/lib/cms/audit';

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookie();
    
    if (session) {
      const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';
      
      // Log logout
      await createAuditLog(session.user, 'logout', {
        ipAddress,
        userAgent,
      });
    }
    
    await logout();
    
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
