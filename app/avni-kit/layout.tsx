import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Avni Brand Kit - Internal Resource',
  description: 'Internal brand kit for Avni developers and social media managers',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AvniBrandKitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
