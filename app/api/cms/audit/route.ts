/**
 * Audit Trail Endpoint
 * GET /api/cms/audit - Get audit logs
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/cms/auth';
import { 
  getAllAuditLogs, 
  getUserAuditLogs, 
  searchAuditLogs,
  getAuditStats,
  exportAuditLogs,
} from '@/lib/cms/audit';

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();
    const { searchParams } = new URL(request.url);
    
    const action = searchParams.get('action');
    const userEmail = searchParams.get('userEmail');
    const resourceId = searchParams.get('resourceId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const stats = searchParams.get('stats') === 'true';
    const exportData = searchParams.get('export') === 'true';
    
    // Export audit logs (admin only)
    if (exportData) {
      if (session.user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Only admins can export audit logs' },
          { status: 403 }
        );
      }
      
      if (!startDate || !endDate) {
        return NextResponse.json(
          { error: 'startDate and endDate required for export' },
          { status: 400 }
        );
      }
      
      const logs = await exportAuditLogs(startDate, endDate);
      
      return NextResponse.json({
        success: true,
        logs,
        count: logs.length,
        period: { startDate, endDate },
      });
    }
    
    // Get statistics
    if (stats) {
      const days = parseInt(searchParams.get('days') || '30');
      const statistics = await getAuditStats(days);
      
      return NextResponse.json({
        success: true,
        stats: statistics,
        period: { days },
      });
    }
    
    // Search with filters
    if (action || resourceId || startDate || endDate) {
      const logs = await searchAuditLogs({
        userEmail: session.user.role === 'admin' ? userEmail || undefined : session.user.email,
        action: action as any,
        resourceId: resourceId || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        limit,
      });
      
      return NextResponse.json({
        success: true,
        logs,
        count: logs.length,
        filters: { action, userEmail, resourceId, startDate, endDate },
      });
    }
    
    // Get user-specific logs (or all for admin)
    let logs;
    if (session.user.role === 'admin' && userEmail) {
      logs = await getUserAuditLogs(userEmail, limit, offset);
    } else if (session.user.role === 'admin' && !userEmail) {
      logs = await getAllAuditLogs(limit, offset);
    } else {
      // Non-admin users can only see their own logs
      logs = await getUserAuditLogs(session.user.email, limit, offset);
    }
    
    return NextResponse.json({
      success: true,
      logs,
      count: logs.length,
      limit,
      offset,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Audit logs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}
