import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Avni System Status - Internal Resource',
  description: 'Internal status page for Avni system monitoring',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AvniStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
