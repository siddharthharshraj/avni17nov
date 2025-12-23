/**
 * Audit Trail System
 * Immutable logging of all user activities
 * Stores last 30 days of audit logs
 */

import { redis } from './redis';
import { User } from './types';

export type AuditAction =
  // Authentication
  | 'login'
  | 'logout'
  | 'login_failed'
  
  // Blog Actions
  | 'blog_created'
  | 'blog_updated'
  | 'blog_deleted'
  | 'blog_viewed'
  
  // Workflow Actions
  | 'blog_submitted_ir'
  | 'blog_submitted_admin'
  | 'blog_approved_ir'
  | 'blog_approved_admin'
  | 'blog_changes_requested_ir'
  | 'blog_changes_requested_admin'
  | 'blog_published'
  | 'blog_unpublished'
  | 'blog_republished'
  
  // Comment Actions
  | 'comment_added'
  | 'comment_resolved'
  | 'comment_unresolved'
  | 'comment_deleted'
  
  // Image Actions
  | 'image_uploaded'
  | 'image_deleted'
  
  // Analytics
  | 'analytics_viewed';

export interface AuditLog {
  id: string;
  timestamp: string;
  
  // User info
  userEmail: string;
  userName: string;
  userRole: string;
  
  // Action details
  action: AuditAction;
  resource?: string;
  resourceId?: string;
  
  // Additional context
  metadata?: Record<string, any>;
  
  // Request info
  ipAddress?: string;
  userAgent?: string;
}

const AUDIT_KEY_PREFIX = 'cms:audit';
const AUDIT_USER_KEY = (email: string) => `${AUDIT_KEY_PREFIX}:user:${email}`;
const AUDIT_GLOBAL_KEY = `${AUDIT_KEY_PREFIX}:global`;
const AUDIT_RETENTION_DAYS = 30;

/**
 * Create an immutable audit log entry
 */
export async function createAuditLog(
  user: User,
  action: AuditAction,
  options?: {
    resource?: string;
    resourceId?: string;
    metadata?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
  }
): Promise<AuditLog | null> {
  try {
    const log: AuditLog = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    userEmail: user.email,
    userName: user.name,
    userRole: user.role,
    action,
    resource: options?.resource,
    resourceId: options?.resourceId,
    metadata: options?.metadata,
    ipAddress: options?.ipAddress,
    userAgent: options?.userAgent,
  };

  const score = Date.now();
  const logJson = JSON.stringify(log);

  // Store in user-specific sorted set (by timestamp)
  if (redis) {
    await redis.zadd(AUDIT_USER_KEY(user.email), {
      score,
      member: logJson,
    });

    // Store in global sorted set
    await redis.zadd(AUDIT_GLOBAL_KEY, {
      score,
      member: logJson,
    });

    // Clean up old entries (older than 30 days)
    await cleanupOldAuditLogs();
  }

  return log;
  } catch (error) {
    console.warn('[CMS] Audit log failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

/**
 * Get audit logs for a specific user
 */
export async function getUserAuditLogs(
  email: string,
  limit: number = 100,
  offset: number = 0
): Promise<AuditLog[]> {
  if (!redis) return [];
  const logs = await redis.zrange(
    AUDIT_USER_KEY(email),
    offset,
    offset + limit - 1,
    { rev: true }
  );

  if (!logs || logs.length === 0) return [];

  return logs.map(log => JSON.parse(log as string));
}

/**
 * Get all audit logs (admin only)
 */
export async function getAllAuditLogs(
  limit: number = 100,
  offset: number = 0
): Promise<AuditLog[]> {
  if (!redis) return [];
  const logs = await redis.zrange(
    AUDIT_GLOBAL_KEY,
    offset,
    offset + limit - 1,
    { rev: true }
  );

  if (!logs || logs.length === 0) return [];

  return logs.map(log => JSON.parse(log as string));
}

/**
 * Get audit logs by action type
 */
export async function getAuditLogsByAction(
  action: AuditAction,
  limit: number = 100
): Promise<AuditLog[]> {
  const allLogs = await getAllAuditLogs(1000); // Get more to filter
  return allLogs
    .filter(log => log.action === action)
    .slice(0, limit);
}

/**
 * Get audit logs for a specific resource
 */
export async function getResourceAuditLogs(
  resourceId: string,
  limit: number = 100
): Promise<AuditLog[]> {
  const allLogs = await getAllAuditLogs(1000);
  return allLogs
    .filter(log => log.resourceId === resourceId)
    .slice(0, limit);
}

/**
 * Get audit statistics
 */
export async function getAuditStats(days: number = 30): Promise<{
  totalLogs: number;
  uniqueUsers: number;
  actionCounts: Record<string, number>;
  topUsers: Array<{ email: string; count: number }>;
}> {
  if (!redis) return { totalLogs: 0, uniqueUsers: 0, actionCounts: {}, topUsers: [] };
  const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
  
  // Get all logs and filter by time
  if (redis) {
    const allLogs = await redis.zrange(AUDIT_GLOBAL_KEY, 0, -1);

    if (!allLogs || allLogs.length === 0) {
      return {
        totalLogs: 0,
        uniqueUsers: 0,
        actionCounts: {},
        topUsers: [],
      };
    }

    const parsedLogs = allLogs
      .map((log: any) => JSON.parse(log as string) as AuditLog)
      .filter((log: AuditLog) => new Date(log.timestamp).getTime() >= cutoffTime);
    
    const uniqueUsers = new Set(parsedLogs.map((log: AuditLog) => log.userEmail));
    
    const actionCounts: Record<string, number> = {};
    parsedLogs.forEach((log: AuditLog) => {
      actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
    });

    const userCounts: Record<string, number> = {};
    parsedLogs.forEach((log: AuditLog) => {
      userCounts[log.userEmail] = (userCounts[log.userEmail] || 0) + 1;
    });

    const topUsers = Object.entries(userCounts)
      .map(([email, count]) => ({ email, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalLogs: parsedLogs.length,
      uniqueUsers: uniqueUsers.size,
      actionCounts,
      topUsers,
    };
  } else {
    return { totalLogs: 0, uniqueUsers: 0, actionCounts: {}, topUsers: [] };
  }
}

/**
 * Clean up audit logs older than retention period
 */
async function cleanupOldAuditLogs(): Promise<void> {
  if (!redis) return;
  const cutoffTime = Date.now() - (AUDIT_RETENTION_DAYS * 24 * 60 * 60 * 1000);
  
  // Remove old entries from global log
  await redis.zremrangebyscore(AUDIT_GLOBAL_KEY, 0, cutoffTime);

  // Remove old entries from user logs
  // Note: This is a simplified approach. In production, you might want to
  // track user emails separately for better performance
  const allLogs = await redis.zrange(AUDIT_GLOBAL_KEY, 0, -1);
  const uniqueEmails = new Set(
    allLogs.map(log => JSON.parse(log as string).userEmail)
  );

  for (const email of uniqueEmails) {
    if (redis) {
      await redis.zremrangebyscore(AUDIT_USER_KEY(email as string), 0, cutoffTime);
    }
  }
}

/**
 * Export audit logs to JSON (for compliance/backup)
 */
export async function exportAuditLogs(
  startDate: string,
  endDate: string
): Promise<AuditLog[]> {
  if (!redis) return [];
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  const allLogs = await redis.zrange(AUDIT_GLOBAL_KEY, 0, -1);

  if (!allLogs || allLogs.length === 0) return [];

  return allLogs
    .map((log: any) => JSON.parse(log as string) as AuditLog)
    .filter((log: AuditLog) => {
      const logTime = new Date(log.timestamp).getTime();
      return logTime >= startTime && logTime <= endTime;
    });
}

/**
 * Search audit logs
 */
export async function searchAuditLogs(query: {
  userEmail?: string;
  action?: AuditAction;
  resourceId?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}): Promise<AuditLog[]> {
  let logs: AuditLog[];

  if (query.userEmail) {
    logs = await getUserAuditLogs(query.userEmail, query.limit || 1000);
  } else {
    logs = await getAllAuditLogs(query.limit || 1000);
  }

  // Apply filters
  if (query.action) {
    logs = logs.filter(log => log.action === query.action);
  }

  if (query.resourceId) {
    logs = logs.filter(log => log.resourceId === query.resourceId);
  }

  if (query.startDate) {
    const startTime = new Date(query.startDate).getTime();
    logs = logs.filter(log => new Date(log.timestamp).getTime() >= startTime);
  }

  if (query.endDate) {
    const endTime = new Date(query.endDate).getTime();
    logs = logs.filter(log => new Date(log.timestamp).getTime() <= endTime);
  }

  return logs.slice(0, query.limit || 100);
}
