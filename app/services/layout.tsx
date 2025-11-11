import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - Avni | Comprehensive Digital Solutions for NGOs',
  description: 'Explore Avni\'s comprehensive services including Cloud Hosting, Dedicated Hosting, Training & Support, and Implementation services to power your NGO\'s digital journey.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
