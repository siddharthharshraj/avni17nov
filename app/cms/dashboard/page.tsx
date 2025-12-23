/**
 * CMS Dashboard Page
 * Main dashboard after login
 */

import { Metadata } from 'next';
import CMSDashboard from '@/components/cms/CMSDashboard';

export const metadata: Metadata = {
  title: 'Dashboard | Avni CMS',
  description: 'CMS Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <CMSDashboard />;
}
