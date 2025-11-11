"use client";

import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { partners } from "@/data";

export default function TrustedBy() {
  return (
    <Section spacing="md">
      <div className="w-full">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12 lg:mb-[51px]">
          <h2 className="font-anek font-medium text-base md:text-lg lg:text-xl leading-tight text-[#fba47e] uppercase">
            Trusted by 60+ NGOs
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden w-full">
          <div className="flex animate-marquee">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <Link
                key={`first-${index}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16 hover:scale-110 transition-transform"
              >
                <div className="relative w-[140px] md:w-[160px] lg:w-[180px] h-[60px] md:h-[70px] lg:h-[80px]">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain transition-all"
                    loading="lazy"
                    sizes="(max-width: 768px) 140px, (max-width: 1024px) 160px, 180px"
                    style={{
                      filter: partner.name === "Calcutta Kids" ? "invert(1) grayscale(1)" : "grayscale(1)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = partner.name === "Calcutta Kids" ? "invert(1)" : "none";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = partner.name === "Calcutta Kids" ? "invert(1) grayscale(1)" : "grayscale(1)";
                    }}
                  />
                </div>
              </Link>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <Link
                key={`second-${index}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16 hover:scale-110 transition-transform"
              >
                <div className="relative w-[140px] md:w-[160px] lg:w-[180px] h-[60px] md:h-[70px] lg:h-[80px]">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain transition-all"
                    loading="lazy"
                    sizes="(max-width: 768px) 140px, (max-width: 1024px) 160px, 180px"
                    style={{
                      filter: partner.name === "Calcutta Kids" ? "invert(1) grayscale(1)" : "grayscale(1)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = partner.name === "Calcutta Kids" ? "invert(1)" : "none";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = partner.name === "Calcutta Kids" ? "invert(1) grayscale(1)" : "grayscale(1)";
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
          will-change: transform;
        }

        @media (min-width: 768px) {
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        }

        @media (min-width: 1024px) {
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </Section>
  );
}
