'use client';

/**
 * Audit Trail Component
 * Displays immutable audit logs of all user activities
 */

import { useState, useEffect } from 'react';
import { Shield, User, Clock, Activity, Filter, Download, TrendingUp } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  userName: string;
  userRole: string;
  action: string;
  resource?: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

interface AuditStats {
  totalLogs: number;
  uniqueUsers: number;
  actionCounts: Record<string, number>;
  topUsers: Array<{ email: string; count: number }>;
}

export default function AuditTrail() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState<AuditStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  
  // Filters
  const [actionFilter, setActionFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [dateRange, setDateRange] = useState(7);

  useEffect(() => {
    fetchAuditLogs();
  }, [actionFilter, userFilter, dateRange]);

  const fetchAuditLogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (actionFilter) params.append('action', actionFilter);
      if (userFilter) params.append('userEmail', userFilter);
      if (dateRange) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - dateRange);
        params.append('startDate', startDate.toISOString());
      }
      params.append('limit', '100');
      
      const response = await fetch(`/api/cms/audit?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch audit logs');
      }
      
      const data = await response.json();
      setLogs(data.logs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/cms/audit?stats=true&days=${dateRange}`);
      const data = await response.json();
      setStats(data.stats);
      setShowStats(true);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const exportLogs = async () => {
    try {
      const endDate = new Date().toISOString();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - dateRange);
      
      const response = await fetch(
        `/api/cms/audit?export=true&startDate=${startDate.toISOString()}&endDate=${endDate}`
      );
      const data = await response.json();
      
      const blob = new Blob([JSON.stringify(data.logs, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${startDate.toISOString().split('T')[0]}-to-${endDate.split('T')[0]}.json`;
      a.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('login')) return 'text-blue-600 bg-blue-50';
    if (action.includes('created')) return 'text-green-600 bg-green-50';
    if (action.includes('deleted')) return 'text-red-600 bg-red-50';
    if (action.includes('published')) return 'text-purple-600 bg-purple-50';
    if (action.includes('approved')) return 'text-teal-600 bg-teal-50';
    return 'text-gray-600 bg-gray-50';
  };

  const formatAction = (action: string) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#419372] mx-auto mb-4"></div>
          <p className="font-noto text-gray-600">Loading audit trail...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#419372]" />
              <div>
                <h1 className="font-anek font-bold text-3xl text-[#0b2540]">
                  Audit Trail
                </h1>
                <p className="font-noto text-gray-600">
                  Immutable log of all user activities (Last 30 days)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchStats}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-anek font-medium flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Statistics
              </button>
              <button
                onClick={exportLogs}
                className="px-4 py-2 bg-[#419372] text-white rounded-lg hover:bg-[#357a5e] font-anek font-medium flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="font-anek font-bold text-lg text-[#0b2540]">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-anek font-semibold text-sm text-gray-700 mb-2">
                Action Type
              </label>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-noto text-sm focus:ring-2 focus:ring-[#419372] focus:border-transparent"
              >
                <option value="">All Actions</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="blog_created">Blog Created</option>
                <option value="blog_updated">Blog Updated</option>
                <option value="blog_published">Blog Published</option>
                <option value="blog_unpublished">Blog Unpublished</option>
                <option value="comment_added">Comment Added</option>
              </select>
            </div>
            <div>
              <label className="block font-anek font-semibold text-sm text-gray-700 mb-2">
                User Email
              </label>
              <input
                type="text"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                placeholder="Filter by email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-noto text-sm focus:ring-2 focus:ring-[#419372] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block font-anek font-semibold text-sm text-gray-700 mb-2">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-noto text-sm focus:ring-2 focus:ring-[#419372] focus:border-transparent"
              >
                <option value={1}>Last 24 hours</option>
                <option value={7}>Last 7 days</option>
                <option value={14}>Last 14 days</option>
                <option value={30}>Last 30 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Modal */}
        {showStats && stats && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-anek font-bold text-2xl text-[#0b2540]">
                  Audit Statistics
                </h2>
                <button
                  onClick={() => setShowStats(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-anek font-semibold text-sm text-gray-600 uppercase mb-1">
                    Total Logs
                  </p>
                  <p className="font-anek font-bold text-3xl text-[#0b2540]">
                    {stats.totalLogs}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="font-anek font-semibold text-sm text-gray-600 uppercase mb-1">
                    Unique Users
                  </p>
                  <p className="font-anek font-bold text-3xl text-[#0b2540]">
                    {stats.uniqueUsers}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-anek font-bold text-lg text-[#0b2540] mb-3">
                  Top Actions
                </h3>
                <div className="space-y-2">
                  {Object.entries(stats.actionCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 10)
                    .map(([action, count]) => (
                      <div key={action} className="flex items-center justify-between">
                        <span className="font-noto text-sm text-gray-700">
                          {formatAction(action)}
                        </span>
                        <span className="font-anek font-semibold text-[#419372]">
                          {count}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-anek font-bold text-lg text-[#0b2540] mb-3">
                  Most Active Users
                </h3>
                <div className="space-y-2">
                  {stats.topUsers.map((user, index) => (
                    <div key={user.email} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-anek font-semibold text-sm text-gray-400">
                          #{index + 1}
                        </span>
                        <span className="font-noto text-sm text-gray-700">
                          {user.email}
                        </span>
                      </div>
                      <span className="font-anek font-semibold text-[#419372]">
                        {user.count} actions
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audit Logs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-anek font-bold text-sm text-gray-700 uppercase">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left font-anek font-bold text-sm text-gray-700 uppercase">
                    User
                  </th>
                  <th className="px-6 py-4 text-left font-anek font-bold text-sm text-gray-700 uppercase">
                    Action
                  </th>
                  <th className="px-6 py-4 text-left font-anek font-bold text-sm text-gray-700 uppercase">
                    Resource
                  </th>
                  <th className="px-6 py-4 text-left font-anek font-bold text-sm text-gray-700 uppercase">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-noto text-gray-700">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {formatTimestamp(log.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-anek font-semibold text-sm text-[#0b2540]">
                            {log.userName}
                          </p>
                          <p className="font-noto text-xs text-gray-500">
                            {log.userEmail}
                          </p>
                          <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-anek uppercase mt-1">
                            {log.userRole}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-anek font-semibold text-xs uppercase ${getActionColor(log.action)}`}>
                        <Activity className="w-3 h-3" />
                        {formatAction(log.action)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {log.resource && (
                        <div className="font-noto text-sm text-gray-700">
                          <p className="font-semibold">{log.resource}</p>
                          {log.resourceId && (
                            <p className="text-xs text-gray-500">{log.resourceId}</p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-gray-600">
                        {log.ipAddress || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {logs.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="font-noto text-gray-500">
                No audit logs found for the selected filters.
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="font-noto text-sm text-blue-800">
            <strong>Note:</strong> Audit logs are immutable and automatically retained for 30 days. 
            Logs older than 30 days are automatically deleted. Export logs regularly for long-term compliance.
          </p>
        </div>
      </div>
    </div>
  );
}
