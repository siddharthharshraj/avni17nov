"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { sectors, impactStories, type Sector } from "@/data/impact-stories";

export default function ImpactStories() {
  const [activeSector, setActiveSector] = useState<Sector>("Education");
  const story = impactStories[activeSector];

  return (
    <Section spacing="lg" className="bg-[#E9EAF84D]">
      <Container>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-[60px]">
          <p className="font-anek font-medium text-xs md:text-sm leading-tight text-[#fba47e] uppercase mb-3 md:mb-4">
            AVNI SCALING ACROSS SECTORS
          </p>
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-[64px] leading-tight text-[#0b2540] mb-3 md:mb-4">
            Impact Stories
          </h2>
          <p className="font-noto text-xl md:text-2xl lg:text-[22px] leading-relaxed text-[#4A4A4A]">
            Empowering Every Mission, Adapting To Every Context
          </p>
        </div>

        {/* Sector Tabs */}
        <div className="flex justify-start gap-3 md:gap-4 mb-12 md:mb-16 lg:mb-[60px] overflow-x-auto scrollbar-hide">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full font-anek font-bold text-[16px] leading-[16px] transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeSector === sector
                  ? "bg-[#419372] text-white shadow-md"
                  : "bg-white text-[#6B7280] hover:bg-[#419372]/10 hover:text-[#0b2540]"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Story Content with Animation */}
        <div 
          className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[60px] items-center transition-all duration-500 ease-in-out"
          key={activeSector}
        >
          {/* Image */}
          <div className="relative w-full lg:w-1/2 aspect-video rounded-2xl lg:rounded-[24px] overflow-hidden shadow-xl flex-shrink-0 animate-fadeIn">
            <Image
              src={story.image}
              alt={story.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 animate-slideIn">
            <h3 className="font-anek font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight text-[#0b2540] mb-4 md:mb-5 lg:mb-[20px]">
              {story.title}
            </h3>
            <p className="font-noto text-xl md:text-2xl lg:text-[22px] leading-relaxed text-[#4A4A4A] mb-6 md:mb-8 lg:mb-[32px]">
              {story.description}
            </p>
            <Link
              href="/impact"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-3 border-2 border-[#419372] text-[#419372] rounded-full md:rounded-[20px] font-anek font-medium text-sm md:text-base hover:bg-[#419372] hover:text-white transition-all"
            >
              Read More →
            </Link>
          </div>
        </div>
      </Container>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </Section>
  );
}
