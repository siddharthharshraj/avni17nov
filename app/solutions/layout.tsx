import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions - Avni | Sector-Specific Digital Solutions',
  description: 'Explore Avni\'s solutions for Education, Healthcare, Water & Sanitation, Waste Management, Social Security, Livelihood, Legal Aid, and Sports programs.',
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
