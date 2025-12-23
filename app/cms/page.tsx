/**
 * CMS Login & Dashboard Page
 * Main entry point for the blog CMS
 */

import { Metadata } from 'next';
import CMSLogin from '@/components/cms/CMSLogin';

export const metadata: Metadata = {
  title: 'CMS Login | Avni',
  description: 'Content Management System for Avni Blog',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CMSPage() {
  return <CMSLogin />;
}
