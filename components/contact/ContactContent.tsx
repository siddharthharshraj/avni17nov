/**
 * Contact Content Component
 * Main content for Contact Us page
 */

'use client';

import { useState } from 'react';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export default function ContactContent() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <ContactHero />

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16">
        {/* Write to us heading */}
        <h2 className="font-anek font-bold text-[24px] md:text-[30px] leading-[28px] md:leading-[32px] text-[#0b2540] mb-6 md:mb-8">
          Write to us!
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Contact Form */}
          <div className="w-full lg:w-[922px]">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-[310px]">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
