/**
 * Contact Us Page
 */

import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactContent from '@/components/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | Avni',
  description: 'Get in touch with the Avni team for questions, support, or collaboration opportunities. We are here to help your organization digitize field operations.',
  keywords: ['contact avni', 'avni support', 'ngo software support', 'field work help'],
  openGraph: {
    title: 'Contact Us - Get in Touch | Avni',
    description: 'Get in touch with the Avni team for questions, support, or collaboration opportunities.',
    url: 'https://avniproject.org/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us - Get in Touch | Avni',
    description: 'Get in touch with the Avni team.',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
