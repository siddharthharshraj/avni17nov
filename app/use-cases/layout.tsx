import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Use Cases - Avni | Digital Solutions for Every Workflow',
  description: 'Explore Avni\'s use cases including Case Management, Reporting, Surveys, Cohort Studies, and Mobile Medical Units. Adaptable solutions for NGOs across all sectors.',
};

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
