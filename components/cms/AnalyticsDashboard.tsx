'use client';

/**
 * Analytics Dashboard Component
 * Shows analytics for all published blogs using Umami data
 */

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Eye, Clock, Share2, MousePointer, BarChart3 } from 'lucide-react';

interface BlogAnalytics {
  id: string;
  slug: string;
  title: string;
  author: string;
  publishedAt: string;
  tags: string[];
  analytics: {
    pageviews: number;
    visitors: number;
    bounceRate: number;
    avgTime: number;
    events: {
      shares: number;
      ctaClicks: number;
      scrollDepth: {
        '25%': number;
        '50%': number;
        '75%': number;
        '100%': number;
      };
    };
  };
}

interface TotalStats {
  totalPageviews: number;
  totalVisitors: number;
  totalBlogs: number;
  avgBounceRate: number;
  avgTimeOnPage: number;
}

export default function AnalyticsDashboard() {
  const [blogs, setBlogs] = useState<BlogAnalytics[]>([]);
  const [totalStats, setTotalStats] = useState<TotalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);
  const [sortBy, setSortBy] = useState<'pageviews' | 'visitors' | 'avgTime'>('pageviews');

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/cms/analytics?days=${days}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const data = await response.json();
      setBlogs(data.blogs);
      setTotalStats(data.totalStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const sortedBlogs = [...blogs].sort((a, b) => {
    return b.analytics[sortBy] - a.analytics[sortBy];
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#419372] mx-auto mb-4"></div>
          <p className="font-noto text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="font-noto text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-[#419372] text-white rounded-lg hover:bg-[#357a5e] font-anek font-medium"
          >
            Retry
          </button>
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
            <div>
              <h1 className="font-anek font-bold text-3xl text-[#0b2540] mb-2">
                Blog Analytics
              </h1>
              <p className="font-noto text-gray-600">
                Performance metrics for all published blogs
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg font-anek text-sm focus:ring-2 focus:ring-[#419372] focus:border-transparent"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
                <option value={365}>Last year</option>
              </select>
              <button
                onClick={fetchAnalytics}
                className="px-4 py-2 bg-[#419372] text-white rounded-lg hover:bg-[#357a5e] font-anek font-medium"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Total Stats Cards */}
        {totalStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <StatCard
              icon={<BarChart3 className="w-6 h-6" />}
              label="Total Blogs"
              value={totalStats.totalBlogs.toString()}
              color="blue"
            />
            <StatCard
              icon={<Eye className="w-6 h-6" />}
              label="Total Pageviews"
              value={formatNumber(totalStats.totalPageviews)}
              color="green"
            />
            <StatCard
              icon={<Users className="w-6 h-6" />}
              label="Total Visitors"
              value={formatNumber(totalStats.totalVisitors)}
              color="purple"
            />
            <StatCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="Avg Bounce Rate"
              value={`${totalStats.avgBounceRate}%`}
              color="orange"
            />
            <StatCard
              icon={<Clock className="w-6 h-6" />}
              label="Avg Time"
              value={formatTime(totalStats.avgTimeOnPage)}
              color="teal"
            />
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="font-anek font-semibold text-sm text-gray-700">Sort by:</span>
            <button
              onClick={() => setSortBy('pageviews')}
              className={`px-4 py-2 rounded-lg font-anek text-sm ${
                sortBy === 'pageviews'
                  ? 'bg-[#419372] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pageviews
            </button>
            <button
              onClick={() => setSortBy('visitors')}
              className={`px-4 py-2 rounded-lg font-anek text-sm ${
                sortBy === 'visitors'
                  ? 'bg-[#419372] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Visitors
            </button>
            <button
              onClick={() => setSortBy('avgTime')}
              className={`px-4 py-2 rounded-lg font-anek text-sm ${
                sortBy === 'avgTime'
                  ? 'bg-[#419372] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Avg Time
            </button>
          </div>
        </div>

        {/* Blogs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-anek font-bold text-sm text-gray-700 uppercase">
                    Blog Title
                  </th>
                  <th className="px-6 py-4 text-left font-anek font-bold text-sm text-gray-700 uppercase">
                    Author
                  </th>
                  <th className="px-6 py-4 text-center font-anek font-bold text-sm text-gray-700 uppercase">
                    Pageviews
                  </th>
                  <th className="px-6 py-4 text-center font-anek font-bold text-sm text-gray-700 uppercase">
                    Visitors
                  </th>
                  <th className="px-6 py-4 text-center font-anek font-bold text-sm text-gray-700 uppercase">
                    Bounce Rate
                  </th>
                  <th className="px-6 py-4 text-center font-anek font-bold text-sm text-gray-700 uppercase">
                    Avg Time
                  </th>
                  <th className="px-6 py-4 text-center font-anek font-bold text-sm text-gray-700 uppercase">
                    Shares
                  </th>
                  <th className="px-6 py-4 text-center font-anek font-bold text-sm text-gray-700 uppercase">
                    CTA Clicks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedBlogs.map((blog, index) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-anek font-semibold text-sm text-gray-400">
                            #{index + 1}
                          </span>
                          <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-anek font-semibold text-[#0b2540] hover:text-[#419372]"
                          >
                            {blog.title}
                          </a>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {blog.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-anek"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-noto text-sm text-gray-700">{blog.author}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-anek font-bold text-lg text-[#419372]">
                        {formatNumber(blog.analytics.pageviews)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-anek font-semibold text-gray-700">
                        {formatNumber(blog.analytics.visitors)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-anek font-semibold ${
                        blog.analytics.bounceRate > 70 ? 'text-red-600' :
                        blog.analytics.bounceRate > 50 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {blog.analytics.bounceRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-anek text-gray-700">
                        {formatTime(blog.analytics.avgTime)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-anek text-gray-700">
                        {blog.analytics.events.shares}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-anek text-gray-700">
                        {blog.analytics.events.ctaClicks}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="font-noto text-gray-500">
                No analytics data available for the selected period.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'teal';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    teal: 'bg-teal-50 text-teal-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]} mb-3`}>
        {icon}
      </div>
      <p className="font-anek font-semibold text-sm text-gray-600 uppercase mb-1">
        {label}
      </p>
      <p className="font-anek font-bold text-3xl text-[#0b2540]">
        {value}
      </p>
    </div>
  );
}
