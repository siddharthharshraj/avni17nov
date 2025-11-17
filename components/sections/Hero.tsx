"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { VideoModal } from "@/components/ui";
import Container from "@/components/ui/Container";

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
<section className="relative bg-[#FCFCFC] pt-[108px] md:pt-[120px] lg:pt-[140px]">
      <Container>
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-12 md:py-16 lg:py-20 min-h-[calc(100vh-180px)]">
        {/* Hero Content */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          {/* Top badge */}
          <p className="font-anek font-bold text-[16px] leading-[20px] text-[#fba47e] uppercase mb-4 md:mb-6 lg:mb-[26px] text-center lg:text-left">
            OPEN SOURCE • MADE IN INDIA • AI Powered
          </p>
          
          {/* Main Heading */}
          <h1 className="font-anek font-medium text-4xl md:text-5xl lg:text-6xl 2xl:text-[86px] leading-tight md:leading-tight lg:leading-[1.05] text-[#0b2540] mb-4 md:mb-6 lg:mb-[19px] text-center lg:text-left">
            <span className="relative inline z-10">
              Digitise your
              <span className="absolute bottom-[2px] md:bottom-[4px] lg:bottom-[8px] left-0 right-0 h-[10px] md:h-[14px] lg:h-[18px] bg-[#FFD84D] z-[-1]"></span>
            </span><br />
            <span className="relative inline z-10">
              field-work,
              <span className="absolute bottom-[2px] md:bottom-[4px] lg:bottom-[8px] left-0 right-0 h-[10px] md:h-[14px] lg:h-[18px] bg-[#FFD84D] z-[-1]"></span>
            </span><br />
            Transform Lives!
          </h1>
          
          {/* Subtitle */}
          <p className="font-noto font-medium text-[20px] leading-[27px] text-[#4A4A4A] mb-6 md:mb-8 lg:mb-[49px] max-w-xl mx-auto lg:mx-0 text-center lg:text-left whitespace-nowrap">
          Empowering NGOs with Simple, Sustainable Digital Tools          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8 lg:mb-[30px] justify-center lg:justify-start">
            <Link
              href="/signup"
              className="flex items-center justify-center w-full sm:w-auto px-6 md:px-8 h-12 md:h-[48px] bg-[#419372] text-[#f6f9fb] rounded-[20px] font-anek font-medium text-sm md:text-base hover:bg-[#419372]/90 transition-all"
            >
              Sign Up for Free Trial
            </Link>
            <a
              href="https://calendly.com/avni-marketing-samanvayfoundation/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full sm:w-auto px-6 md:px-8 h-12 md:h-[48px] border-2 border-[#419372] text-[#419372] rounded-[20px] font-anek font-medium text-sm md:text-base hover:bg-[#419372] hover:text-white transition-all"
            >
              Schedule a Demo
            </a>
          </div>
          
          {/* Divider Line */}
          <div className="w-full max-w-xl h-[1px] bg-[#D9D9D9] mb-6 md:mb-8 lg:mb-[30px] mx-auto lg:mx-0"></div>
          
          {/* Stats Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-xl mx-auto lg:mx-0">
            {/* Stat 1 */}
            <div className="relative pl-4 md:pl-[18px] text-center sm:text-left">
              <div className="absolute left-0 top-0 w-[4px] h-[40px] bg-[#FFD84D] hidden sm:block"></div>
              <p className="font-anek font-bold text-[24px] leading-[32px] text-[#0b2540] mb-2">11.1 M</p>
              <p className="font-anek font-medium text-base md:text-lg lg:text-[18px] leading-tight text-[#9CA3AF]">Individuals Served</p>
            </div>
            {/* Stat 2 */}
            <div className="relative pl-4 md:pl-[18px] text-center sm:text-left">
              <div className="absolute left-0 top-0 w-[4px] h-[40px] bg-[#FFD84D] hidden sm:block"></div>
              <p className="font-anek font-bold text-[24px] leading-[32px] text-[#0b2540] mb-2">10k +</p>
              <p className="font-anek font-medium text-base md:text-lg lg:text-[18px] leading-tight text-[#9CA3AF]">Active Users</p>
            </div>
            {/* Stat 3 */}
            <div className="relative pl-4 md:pl-[18px] text-center sm:text-left">
              <div className="absolute left-0 top-0 w-[4px] h-[40px] bg-[#FFD84D] hidden sm:block"></div>
              <p className="font-anek font-bold text-[24px] leading-[32px] text-[#0b2540] mb-2">60+</p>
              <p className="font-anek font-medium text-base md:text-lg lg:text-[18px] leading-tight text-[#9CA3AF] whitespace-nowrap">NGOs Empowered</p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 relative flex items-center justify-center">
          <div className="relative w-full max-w-[600px]" style={{ aspectRatio: '1/1' }}>
            {/* Clickable hero image with play button */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className="relative w-full cursor-pointer hover:opacity-95 transition-opacity"
              aria-label="Play Avni platform video"
            >
              <Image
                src="/hero-main.webp"
                alt="Avni platform - Digitise your field-work, Transform Lives!"
                width={600}
                height={600}
                priority
                fetchPriority="high"
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                quality={75}
                style={{ maxWidth: '100%', height: 'auto', display: 'block', contain: 'layout' }}
                unoptimized={false}
                placeholder="empty"
              />
            </button>
          </div>
        </div>
      </div>
      </Container>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId="Xt9EUNXKfWI"
        title="Transforming Field Work for NGOs"
        description="See how Avni is empowering NGOs across India with simple, sustainable digital tools. Watch real stories of impact from our partners working in education, healthcare, and community development."
        ctaText="Start Your Free Trial"
        ctaLink="/signup"
      />
    </section>
  );
}
