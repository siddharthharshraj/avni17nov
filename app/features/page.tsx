import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Features | Avni',
  description: 'Explore Avni features and use cases for NGO field operations.',
};

export default function FeaturesPage() {
  // Redirect to use-cases page
  redirect('/use-cases');
}
