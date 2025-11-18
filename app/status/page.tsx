'use client';

/**
 * Avni Status Page
 * Internal resource for developers and team members
 * Redirects to Freshping status page
 */

import { ExternalLink, Activity, CheckCircle } from 'lucide-react';

export default function AvniStatusPage() {
  const handleStatusClick = () => {
    window.open('https://statuspage.freshping.io/69780-AvniStatus', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCFCFC] to-[#E9EAF8] flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E6E6E6]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#419372] to-[#357a5e] px-8 py-6">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-white" />
              <h1 className="font-anek font-bold text-3xl text-white">
                Avni System Status
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-anek font-semibold text-sm">
                  Real-time Monitoring Active
                </span>
              </div>
              
              <p className="font-noto text-lg text-[#5a6c7d] mb-2">
                Check the current operational status of all Avni services
              </p>
              <p className="font-noto text-sm text-[#5a6c7d]">
                View uptime, incidents, and scheduled maintenance
              </p>
            </div>

            {/* Status Button */}
            <button
              onClick={handleStatusClick}
              className="w-full group relative overflow-hidden bg-[#419372] hover:bg-[#357a5e] text-white rounded-xl px-8 py-6 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="font-anek font-bold text-xl mb-1">
                    View System Status
                  </div>
                  <div className="font-noto text-sm opacity-90">
                    statuspage.freshping.io
                  </div>
                </div>
                <ExternalLink className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-[#FCFCFC] rounded-lg p-4 border border-[#E6E6E6]">
                <div className="font-anek font-semibold text-sm text-[#0b2540] mb-1">
                  Uptime Monitoring
                </div>
                <div className="font-noto text-xs text-[#5a6c7d]">
                  24/7 service availability tracking
                </div>
              </div>
              
              <div className="bg-[#FCFCFC] rounded-lg p-4 border border-[#E6E6E6]">
                <div className="font-anek font-semibold text-sm text-[#0b2540] mb-1">
                  Incident Reports
                </div>
                <div className="font-noto text-xs text-[#5a6c7d]">
                  Real-time incident updates
                </div>
              </div>
              
              <div className="bg-[#FCFCFC] rounded-lg p-4 border border-[#E6E6E6]">
                <div className="font-anek font-semibold text-sm text-[#0b2540] mb-1">
                  Maintenance Schedule
                </div>
                <div className="font-noto text-xs text-[#5a6c7d]">
                  Planned downtime notifications
                </div>
              </div>
            </div>

            {/* Services Monitored */}
            <div className="mt-8 pt-6 border-t border-[#E6E6E6]">
              <h2 className="font-anek font-semibold text-sm text-[#0b2540] mb-3">
                Monitored Services
              </h2>
              <div className="space-y-2">
                {[
                  'Avni Web Application',
                  'Avni Mobile App API',
                  'Database Services',
                  'Authentication Services',
                  'File Storage & CDN',
                ].map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-2 font-noto text-sm text-[#5a6c7d]"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#FCFCFC] px-8 py-4 border-t border-[#E6E6E6]">
            <p className="font-noto text-xs text-center text-[#5a6c7d]">
              This page is for internal use only. For support, contact the Avni team.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-noto text-sm text-[#419372] hover:underline"
          >
            ← Back to Avni Website
          </a>
        </div>
      </div>
    </div>
  );
}
