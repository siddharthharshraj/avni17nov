/**
 * CTA Section - Built By Non-Profits, For Non-Profits
 * Exact Figma design implementation
 */

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function CTASection() {
  return (
    <Section spacing="xl" className="bg-white overflow-visible">
      <div className="relative w-full max-w-[1440px] mx-auto px-0 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-8 xl:gap-12">
          {/* Left Side - Team Image with Organic Blob Background */}
          <div className="relative flex-shrink-0 w-full lg:w-[58%] xl:w-[60%] 2xl:w-[62%] px-6 lg:px-0 lg:-ml-16 xl:-ml-20">
            <div className="relative w-full aspect-[540/440]">
              <Image
                src="/images/built2.webp"
                alt="Built by Non-Profits, For Non-Profits - Field team working together"
                fill
                className="object-contain scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 58vw, 62vw"
                priority
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 text-center lg:text-left px-6 lg:px-0 lg:pr-12">
            {/* Title */}
            <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] leading-[1.2] text-[#1a3a52] mb-6 lg:mb-7">
              Built By Non-Profits, For Non-Profits
            </h2>

            {/* Description - Exact formatting as in image */}
            <div className="space-y-1 mb-8 lg:mb-10">
              <p className="font-noto font-normal text-base md:text-lg lg:text-xl xl:text-[22px] leading-relaxed text-[#5a5a5a]">
                Ready to Transform Your Field Operations?
              </p>
              <p className="font-noto font-normal text-base md:text-lg lg:text-xl xl:text-[22px] leading-relaxed text-[#5a5a5a]">
                Start your journey with Avni today.
              </p>
              <p className="font-noto font-bold text-base md:text-lg lg:text-xl xl:text-[22px] leading-relaxed text-[#1a3a52]">
                No credit card required.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 md:gap-4 justify-center lg:justify-start">
              {/* First Row - Sign Up and Book Demo */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                <Link
                  href="/signup"
                  className="px-6 md:px-8 py-3 md:py-3.5 bg-[#419372] text-white rounded-full font-anek font-semibold text-sm md:text-base leading-tight hover:bg-[#357a5e] transition-all text-center"
                >
                  Sign Up for Free Trial
                </Link>
                <Link
                  href="/demo"
                  className="px-6 md:px-8 py-3 md:py-3.5 border-2 border-[#419372] text-[#419372] rounded-full font-anek font-semibold text-sm md:text-base leading-tight hover:bg-[#419372] hover:text-white transition-all text-center"
                >
                  Book A Demo
                </Link>
              </div>
              
              {/* Second Row - Contact Sales */}
              <div className="flex justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="px-6 md:px-8 py-3 md:py-3.5 border-2 border-[#419372] text-[#419372] rounded-full font-anek font-semibold text-sm md:text-base leading-tight hover:bg-[#419372] hover:text-white transition-all text-center"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
