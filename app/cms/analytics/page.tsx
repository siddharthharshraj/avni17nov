/**
 * Analytics Page
 * Shows analytics dashboard for all published blogs
 */

import { Metadata } from 'next';
import AnalyticsDashboard from '@/components/cms/AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Blog Analytics | Avni CMS',
  description: 'View analytics for all published blogs',
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
