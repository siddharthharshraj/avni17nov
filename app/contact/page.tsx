/**
 * Contact Us Page
 */

import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactContent from '@/components/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us | Avni',
  description: 'Reach out for product questions, support, partnerships, or anything you need to move your field operations forward',
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
