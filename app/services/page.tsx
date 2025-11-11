'use client';

/**
 * Services Page - Product Services
 * Comprehensive services to power NGO's digital journey
 * Alternating layout sections with service details
 */

import { useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const services = [
  {
    id: 'avni-cloud',
    title: 'Avni Cloud',
    description: 'Get started instantly with secure, managed hosting on Avni Cloud — no technical setup required. Enjoy automatic updates, backups, and maintenance, so your team can focus on fieldwork and impact',
    image: '/images/hero-image.jpg',
    features: [
      'Secure, Scalable Cloud Hosting',
      'Automatic Updates And Maintenance',
      'Daily Backups And Data Protection',
      'Seamless Integration With Avni Apps',
      'Low Operational Overhead'
    ],
    imagePosition: 'right'
  },
  {
    id: 'dedicated-hosting',
    title: 'Dedicated Hosting',
    description: 'For organizations needing full control and customization, Avni offers dedicated hosting. Host Avni on your own servers or private cloud to meet internal IT, data privacy, or compliance requirements',
    image: '/images/simplify-data.png',
    features: [
      'Full Control Over Data And Infrastructure',
      'Custom Security And Compliance Settings',
      'Scalable For Large Or Sensitive Programs',
      'Optional Technical Guidance From Avni Team'
    ],
    imagePosition: 'left'
  },
  {
    id: 'training-support',
    title: 'Training & Support',
    description: 'Empower your team to use Avni confidently through hands-on training and ongoing support. From onboarding to troubleshooting, we ensure your staff can design, deploy, and manage programs smoothly',
    image: '/images/hero-image.jpg',
    features: [
      'Structured Onboarding Sessions',
      'Admin And Fieldworker Training',
      'Ongoing Technical Support',
      'Documentation, FAQs, And Helpdesk Access'
    ],
    imagePosition: 'right'
  },
  {
    id: 'implementation',
    title: 'Implementation',
    description: 'Work with our experts to translate your program needs into a digital solution. We guide you from requirement mapping to rollout — ensuring Avni is customized for your workflows and ready for scale',
    image: '/images/simplify-data.png',
    features: [
      'Requirement Analysis And Program Mapping',
      'Form And Workflow Configuration',
      'Data Migration And Testing',
      'Go-Live Support And Optimization'
    ],
    imagePosition: 'left'
  }
];

export default function ServicesPage() {
  // Handle anchor scrolling from dropdown
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-[72px]">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-16 xl:px-24 py-12 lg:py-16">
          <div className="max-w-[1200px] mx-auto text-center">
            <p className="font-anek font-bold text-[14px] leading-[20px] text-[#fba57f] uppercase tracking-[0.5px] mb-6">
              SET UP. SCALE UP. SUSTAIN WITH AVNI
            </p>
            
            <h1 className="font-anek font-bold text-[36px] lg:text-[48px] leading-[1.2] text-[#0a1f3d] mb-6 max-w-[900px] mx-auto">
              Comprehensive Services To Power Your NGO's Digital Journey
            </h1>
            
            <p className="font-noto text-[17px] lg:text-[19px] leading-[1.6] text-[#5a6c7d] max-w-[800px] mx-auto">
              From secure cloud hosting to dedicated infrastructure, hands-on training, and expert implementation — Avni offers everything NGOs need to digitize their programs confidently. Our services are designed to simplify setup, strengthen capacity, and ensure long-term sustainability for organizations working in the field
            </p>
          </div>
        </section>

        {/* Services Sections */}
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`relative px-6 lg:px-16 xl:px-24 py-12 lg:py-16 scroll-mt-24 ${
              index % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'
            }`}
          >
            <div className="max-w-[1200px] mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                service.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Text Content */}
                <div className={`space-y-6 ${service.imagePosition === 'left' ? 'lg:order-2' : ''}`}>
                  <h2 className="font-anek font-bold text-[28px] lg:text-[36px] leading-[1.2] text-[#0a1f3d]">
                    {service.title}
                  </h2>
                  
                  <p className="font-noto text-[16px] lg:text-[17px] leading-[1.7] text-[#5a6c7d]">
                    {service.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-4">
                    <h3 className="font-anek font-semibold text-[14px] uppercase tracking-wide text-[#0a1f3d]">
                      KEY FEATURES
                    </h3>
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="relative w-[17px] h-[17px] flex-shrink-0 mt-0.5">
                            <Image
                              src="/icons/general/tick.svg"
                              alt="Check"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="font-noto text-[15px] text-[#5a6c7d] leading-[1.6]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Try Avni Button */}
                  <div className="pt-2">
                    <button className="px-6 py-3 border-2 border-[#419372] text-[#419372] font-anek font-semibold text-[16px] rounded-full hover:bg-[#419372] hover:text-white transition-all">
                      Try Avni →
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div className={`relative ${service.imagePosition === 'left' ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden shadow-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
