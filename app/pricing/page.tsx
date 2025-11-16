import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PricingHero from "@/components/sections/pricing/PricingHero";
import PricingCards from "@/components/sections/pricing/PricingCards";
import CloudHosting from "@/components/sections/pricing/CloudHosting";
import PricingFAQ from "@/components/sections/pricing/PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing - Transparent, Scalable, Affordable",
  description: "Choose the Avni plan that fits your budget. From free self-service to fully managed solutions, we support your growth while keeping budgets in check.",
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
