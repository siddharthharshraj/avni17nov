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
    <Section spacing="xl" className="bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Left Side - Team Image with Organic Blob Background */}
          <div className="relative flex-shrink-0 w-full lg:w-[700px] xl:w-[800px] aspect-[540/440]">
            <div className="relative w-full h-full">
              <Image
                src="/images/built2.png"
                alt="Built by Non-Profits, For Non-Profits - Field team working together"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Title */}
            <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540] mb-4 md:mb-6">
              Built By Non-Profits, For Non-Profits
            </h2>

            {/* Description */}
            <p className="font-noto text-sm md:text-base leading-relaxed text-[#000000] mb-2">
              Ready to Transform Your Field Operations?
            </p>
            <p className="font-noto text-sm md:text-base leading-relaxed text-[#000000] mb-6 md:mb-8">
              Start your journey with Avni today.
            </p>
            <p className="font-anek font-bold text-sm md:text-base leading-relaxed text-[#0b2540] mb-6 md:mb-8">
              No credit card required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
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
              <Link
                href="/contact"
                className="px-6 md:px-8 py-3 md:py-3.5 border-2 border-[#419372] text-[#419372] rounded-full font-anek font-semibold text-sm md:text-base leading-tight hover:bg-[#419372] hover:text-white transition-all text-center"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
