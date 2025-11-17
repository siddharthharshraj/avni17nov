import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Start Free Trial | Avni',
  description: 'Start your free trial of Avni today. No credit card required.',
};

export default function TrialPage() {
  // Redirect to signup page
  redirect('/signup');
}
