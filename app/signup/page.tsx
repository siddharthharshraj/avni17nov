/**
 * Signup Page
 * n8n-powered signup form with validation
 */

import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SignupForm from '@/components/signup/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up - Start Your Free Trial | Avni',
  description: 'Start your 30-day free trial with Avni. Join organizations worldwide using Avni to digitize field operations and create impact.',
  keywords: ['signup', 'free trial', 'register', 'get started', 'avni', 'ngo software'],
  openGraph: {
    title: 'Sign Up - Start Your Free Trial | Avni',
    description: 'Start your 30-day free trial with Avni. Join organizations worldwide using Avni to digitize field operations and create impact.',
    type: 'website',
  },
};

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-[72px]">
        <SignupForm />
      </main>
      <Footer />
    </>
  );
}
