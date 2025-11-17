import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function WhatAvniDoes() {
  return (
    <Section spacing="lg">
      <Container>
        {/* Top Section - Heading */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 max-w-4xl mx-auto">
          <h3 className="font-anek font-medium text-base md:text-lg lg:text-xl leading-tight text-[#fba47e] uppercase mb-3 md:mb-4">
            WHAT AVNI DOES?
          </h3>
          
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-[48px] leading-tight text-[#0b2540] mb-4 md:mb-5">
            A <span className="bg-[#FFD84D] px-1">Sustainable Digitisation</span> Solution
          </h2>
          
          <p className="font-noto font-normal text-xl md:text-2xl lg:text-[22px] leading-relaxed text-[#4A4A4A] max-w-3xl mx-auto">
            Avni strives to be a digital partner for NGOs, by understanding their unique needs, providing secure cloud hosting, self-service, training & guidance and offline app to empower field workers- making digital transformation sustainable
          </p>
        </div>

        {/* Feature 1: Build Trust - Image First on Mobile, Content Left on Desktop */}
        <div className="mb-12 md:mb-16 lg:mb-24 pb-12 md:pb-16 lg:pb-0 border-b lg:border-b-0 border-gray-200">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
            {/* Image - First on mobile, Right on desktop */}
            <div className="w-full lg:w-1/2 lg:order-2 relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/build-trust.png"
                alt="Build Trust With One Source Of Truth"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Content - Second on mobile, Left on desktop */}
            <div className="w-full lg:w-1/2 lg:order-1">
              <h3 className="font-anek font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight text-[#0b2540] mb-3 md:mb-4 text-center lg:text-left">
                Build Trust With One Source Of Truth
              </h3>
              <p className="font-noto text-xl md:text-2xl lg:text-[22px] leading-relaxed text-[#4A4A4A] mb-6 md:mb-8 text-left">
                Give every stakeholder <span className="bg-[#FFD84D] px-1">access to real-time, reliable information from a single platform</span>. Avni ensures consistency and transparency so your teams can make decisions with confidence.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link 
                  href="/resources/case-studies" 
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#419372] text-[#419372] rounded-[20px] font-anek font-medium text-sm hover:bg-[#419372] hover:text-white transition-all"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Simplify Data - Image Left, Content Right */}
        <div className="mb-12 md:mb-16 lg:mb-24 pb-12 md:pb-16 lg:pb-0 border-b lg:border-b-0 border-gray-200">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
            {/* Image Left */}
            <div className="w-full lg:w-1/2 relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/simplify-data.png"
                alt="Simplify Data Collection And Management"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Content Right */}
            <div className="w-full lg:w-1/2">
              <h3 className="font-anek font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight text-[#0b2540] mb-3 md:mb-4 text-center lg:text-left">
                Simplify Data Collection And Management
              </h3>
              <p className="font-noto text-xl md:text-2xl lg:text-[22px] leading-relaxed text-[#4A4A4A] mb-6 md:mb-8 text-left">
                Free your teams from the burden of <span className="bg-[#FFD84D] px-1">manual paperwork and scattered spreadsheets</span>. Avni streamlines field data collection so you can focus on what matters most — impact on the ground.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link 
                  href="/resources/case-studies" 
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#419372] text-[#419372] rounded-[20px] font-anek font-medium text-sm hover:bg-[#419372] hover:text-white transition-all"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Steer Programs - Image First on Mobile, Content Left on Desktop */}
        <div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
            {/* Image - First on mobile, Right on desktop */}
            <div className="w-full lg:w-1/2 lg:order-2 relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/steer-programs.png"
                alt="Steer Your Programs With Insight And Agility"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Content - Second on mobile, Left on desktop */}
            <div className="w-full lg:w-1/2 lg:order-1">
              <h3 className="font-anek font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight text-[#0b2540] mb-3 md:mb-4 text-center lg:text-left">
                Steer Your Programs With Insight And Agility
              </h3>
              <p className="font-noto text-xl md:text-2xl lg:text-[22px] leading-relaxed text-[#4A4A4A] mb-6 md:mb-8 text-left">
                Access <span className="bg-[#FFD84D] px-1">accurate, real-time data</span> that helps you adapt and improve your programs continuously. Use feedback from the field to respond faster and serve your communities more effectively.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link 
                  href="/resources/case-studies" 
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#419372] text-[#419372] rounded-[20px] font-anek font-medium text-sm hover:bg-[#419372] hover:text-white transition-all"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
