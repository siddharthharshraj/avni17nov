import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import Header from "@/components/layout/Header";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import { OrganizationSchema, WebsiteSchema, SoftwareApplicationSchema } from '@/components/seo/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { pageMetadata } from '@/lib/seo/config';

export const metadata: Metadata = generateSEOMetadata({
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  keywords: pageMetadata.home.keywords,
  url: '/',
});

// Dynamic imports for below-the-fold components
const WhatAvniDoes = dynamic(() => import("@/components/sections/WhatAvniDoes"), {
  loading: () => <div className="h-screen" />
});
const ImpactStories = dynamic(() => import("@/components/sections/ImpactStories"), {
  loading: () => <div className="h-screen" />
});
const WhyChooseAvni = dynamic(() => import("@/components/sections/WhyChooseAvni"), {
  loading: () => <div className="h-screen" />
});
const Solutions = dynamic(() => import("@/components/sections/Solutions"), {
  loading: () => <div className="h-screen" />
});
const Transparency = dynamic(() => import("@/components/sections/Transparency"), {
  loading: () => <div className="h-screen" />
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => <div className="h-screen" />
});
const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
  loading: () => <div className="h-screen" />
});
const Newsletter = dynamic(() => import("@/components/sections/Newsletter"), {
  loading: () => <div className="h-screen" />
});

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <OrganizationSchema />
      <WebsiteSchema />
      <SoftwareApplicationSchema />
      
      <Header />
      <AnnouncementBanner />
      <main>
        <Hero />
        <TrustedBy />
        <WhatAvniDoes />
        <ImpactStories />
        <WhyChooseAvni />
        <Solutions />
        <Transparency />
        <Testimonials />
        <CTASection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
