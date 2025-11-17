import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PricingHero from "@/components/sections/pricing/PricingHero";
import PricingCards from "@/components/sections/pricing/PricingCards";
import CloudHosting from "@/components/sections/pricing/CloudHosting";
import PricingFAQ from "@/components/sections/pricing/PricingFAQ";

export const metadata: Metadata = {
  title: 'Pricing - Affordable Plans for NGOs | Avni',
  description: 'Transparent pricing for Avni field work platform. Cloud hosting, dedicated support, and custom implementations. No hidden costs. Free trial available for NGOs.',
  keywords: ['avni pricing', 'ngo software pricing', 'field work platform cost', 'cloud hosting ngo', 'affordable ngo software'],
  openGraph: {
    title: 'Pricing - Affordable Plans for NGOs | Avni',
    description: 'Transparent pricing for Avni field work platform. Cloud hosting, dedicated support, and custom implementations.',
    url: 'https://avniproject.org/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - Affordable Plans for NGOs | Avni',
    description: 'Transparent pricing for Avni field work platform.',
  },
  alternates: {
    canonical: '/pricing',
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PricingHero />
        <PricingCards />
        <CloudHosting />
        <PricingFAQ />
      </main>
      <Footer />
    </>
  );
}
