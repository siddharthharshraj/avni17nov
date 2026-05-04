'use client';

/**
 * CMS Dashboard Component
 * Main dashboard with navigation to all CMS features
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  BarChart3, 
  Shield, 
  LogOut, 
  Plus,
  Loader2,
  User
} from 'lucide-react';

export default function CMSDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setSession(data);
        } else {
          router.push('/cms');
        }
      } else {
        router.push('/cms');
      }
    } catch (err) {
      router.push('/cms');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/cms');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#1F7A63] animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const features = [
    {
      title: 'My Blogs',
      description: 'Create and manage your blog posts',
      icon: FileText,
      href: '/cms/blogs',
      color: 'bg-blue-500',
    },
    {
      title: 'Analytics',
      description: 'View blog performance metrics',
      icon: BarChart3,
      href: '/cms/analytics',
      color: 'bg-green-500',
    },
    {
      title: 'Audit Trail',
      description: 'View activity logs and history',
      icon: Shield,
      href: '/cms/audit',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#1F7A63]" />
              <h1 className="font-anek font-bold text-xl text-[#0b2540]">
                Avni CMS
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-600" />
                <div className="text-right">
                  <p className="font-anek font-semibold text-sm text-[#0b2540]">
                    {session.user.name}
                  </p>
                  <p className="font-noto text-xs text-gray-500">
                    {session.user.role}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-anek font-medium text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <h2 className="font-anek font-bold text-3xl text-[#0b2540] mb-2">
            Welcome back, {session.user.name.split(' ')[0]}!
          </h2>
          <p className="font-noto text-gray-600">
            Manage your blog content and view analytics
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <button
            onClick={() => router.push('/cms/blogs/new')}
            className="flex items-center gap-3 px-6 py-4 bg-[#1F7A63] text-white rounded-lg hover:bg-[#155947] transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-anek font-semibold">Create New Blog</span>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <button
              key={feature.href}
              onClick={() => router.push(feature.href)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-[#1F7A63] transition-all text-left group"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.color} bg-opacity-10 mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color.replace('bg-', 'text-')}`} />
              </div>
              <h3 className="font-anek font-bold text-xl text-[#0b2540] mb-2 group-hover:text-[#1F7A63]">
                {feature.title}
              </h3>
              <p className="font-noto text-gray-600 text-sm">
                {feature.description}
              </p>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="font-anek font-semibold text-sm text-gray-600 uppercase mb-2">
              Your Blogs
            </p>
            <p className="font-anek font-bold text-3xl text-[#0b2540]">
              -
            </p>
            <p className="font-noto text-xs text-gray-500 mt-1">
              Loading...
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="font-anek font-semibold text-sm text-gray-600 uppercase mb-2">
              Total Views
            </p>
            <p className="font-anek font-bold text-3xl text-[#0b2540]">
              -
            </p>
            <p className="font-noto text-xs text-gray-500 mt-1">
              Last 30 days
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="font-anek font-semibold text-sm text-gray-600 uppercase mb-2">
              Your Role
            </p>
            <p className="font-anek font-bold text-3xl text-[#0b2540] capitalize">
              {session.user.role}
            </p>
            <p className="font-noto text-xs text-gray-500 mt-1">
              Access level
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
