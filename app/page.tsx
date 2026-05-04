import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import Header from "@/components/layout/Header";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
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
const Problem = dynamic(() => import("@/components/sections/Problem"), {
  loading: () => <div className="h-screen" />
});
const TrustedBy = dynamic(() => import("@/components/sections/TrustedBy"), {
  loading: () => <div className="h-32" />
});
const WhatAvniDoes = dynamic(() => import("@/components/sections/WhatAvniDoes"), {
  loading: () => <div className="h-screen" />
});
const TheShift = dynamic(() => import("@/components/sections/TheShift"), {
  loading: () => <div className="h-screen" />
});
const Transformation = dynamic(() => import("@/components/sections/Transformation"), {
  loading: () => <div className="h-screen" />
});
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), {
  loading: () => <div className="h-screen" />
});
const ImpactStories = dynamic(() => import("@/components/sections/ImpactStories"), {
  loading: () => <div className="h-screen" />
});
const WhyChooseAvni = dynamic(() => import("@/components/sections/WhyChooseAvni"), {
  loading: () => <div className="h-screen" />
});
const WhyAvni = dynamic(() => import("@/components/sections/WhyAvni"), {
  loading: () => <div className="h-screen" />
});
const Impact = dynamic(() => import("@/components/sections/Impact"), {
  loading: () => <div className="h-screen" />
});
const WhoItsFor = dynamic(() => import("@/components/sections/WhoItsFor"), {
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
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"), {
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
        {/* Landing redesign — order follows the design-review brief.
            Phase 2: TheShift / WhyAvni / FinalCTA replace WhatAvniDoes /
            WhyChooseAvni / CTASection. Old components are still in
            components/sections and kept on the page for A/B comparison
            (rendered after the brief flow). Phase 3 will trim them. */}
        <Hero />                {/* 1. Hero */}
        <Problem />             {/* 2. Problem */}
        <TheShift />            {/* 3. The Shift (3 pillars) */}
        <Transformation />      {/* 4. Before → After */}
        <HowItWorks />          {/* 5. How it works */}
        <WhyAvni />             {/* 6. Why Avni (4 tiles + Job-aid hero) */}
        <Impact />              {/* 7. Impact numbers */}
        <ImpactStories />       {/* 8. Stories */}
        <WhoItsFor />           {/* 9. Who it's for */}
        <FinalCTA />            {/* 10. Final CTA (dark green band) */}

        {/* --- Legacy sections kept for A/B; Phase 3 will remove --- */}
        <TrustedBy />
        <WhatAvniDoes />
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
