/**
 * Footer Component - Exact Figma Design
 * Includes 4 columns, download app section, recognition badges, and social links
 */

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12 md:py-16 lg:py-20">
      <Container>
        {/* Main Footer Grid - 1→2→4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16">
          {/* Column 1 - PRODUCT */}
          <div>
            <h4 className="font-anek font-bold text-xs md:text-sm leading-tight text-white/60 mb-4 md:mb-6 uppercase tracking-wider">
              PRODUCT
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <Link href="/introduction" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Introduction
                </Link>
              </li>
              <li>
                <Link href="/design" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/database-guide" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Database Guide
                </Link>
              </li>
              <li>
                <Link href="/features" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - COMPANY */}
          <div>
            <h4 className="font-anek font-bold text-xs md:text-sm leading-tight text-white/60 mb-4 md:mb-6 uppercase tracking-wider">
              COMPANY
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <Link href="/about" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/code-of-conduct" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Code Of Conduct
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - RESOURCES */}
          <div>
            <h4 className="font-anek font-bold text-xs md:text-sm leading-tight text-white/60 mb-4 md:mb-6 uppercase tracking-wider">
              RESOURCES
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <Link href="/getting-started" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/events" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/faq" className="font-noto font-semibold text-sm md:text-base leading-relaxed text-white hover:text-[#419372] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - DOWNLOAD AVNI APP */}
          <div>
            <h4 className="font-anek font-bold text-xs md:text-sm leading-tight text-white/60 mb-4 md:mb-6 uppercase tracking-wider">
              DOWNLOAD AVNI APP
            </h4>
            
            {/* Google Play Button */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.avniproject" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mb-[32px] hover:opacity-80 transition-opacity"
            >
              <div className="relative w-[160px] h-[48px]">
                <Image
                  src="/footer/google-play.png"
                  alt="Get it on Google Play"
                  fill
                  className="object-contain"
                />
              </div>
            </a>

            {/* Recognised By Section */}
            <div>
              <h5 className="font-anek font-bold text-[12px] leading-[16px] text-white/60 mb-[16px] uppercase tracking-wider">
                RECOGNISED BY
              </h5>
              <div className="flex gap-[16px]">
                {/* DPG Badge - Clickable */}
                <a 
                  href="https://www.digitalpublicgoods.net/r/avni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-[180px] h-[90px] bg-white rounded-[12px] p-[16px] flex items-center justify-center hover:shadow-lg transition-shadow"
                >
                  <Image
                    src="/footer/DPG.png"
                    alt="Digital Public Good"
                    fill
                    className="object-contain p-[12px]"
                  />
                </a>
                {/* Economic Survey Badge */}
                <div className="relative w-[180px] h-[90px] bg-white rounded-[12px] p-[16px] flex items-center justify-center">
                  <Image
                    src="/footer/economic_survey.png"
                    alt="Economic Survey 2024-2025"
                    fill
                    className="object-contain p-[12px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-[32px]">
          <div className="flex justify-between items-center">
            {/* Copyright */}
            <p className="font-noto text-[12px] leading-[16px] text-white/60">
              ALL RIGHTS RESERVED ©AVNI-PROJECT | OPEN SOURCE | MADE WITH <span className="text-red-500">❤️</span> IN INDIA
            </p>

            {/* Social Icons */}
            <div className="flex gap-[16px]">
              <a 
                href="https://www.facebook.com/avniproject" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-[#419372] transition-colors"
              >
                <Image
                  src="/footer/fb-new.png"
                  alt="Facebook"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </a>
              <a 
                href="https://github.com/avniproject" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-[#419372] transition-colors"
              >
                <Image
                  src="/footer/github.png"
                  alt="GitHub"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </a>
              <a 
                href="https://www.linkedin.com/showcase/avniproject/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-[#419372] transition-colors"
              >
                <Image
                  src="/footer/linkedin-new.png"
                  alt="LinkedIn"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </a>
              <a 
                href="https://x.com/avniproject" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-[#419372] transition-colors"
              >
                <Image
                  src="/footer/x-new.png"
                  alt="X (Twitter)"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </a>
              <a 
                href="https://www.youtube.com/@avniproject" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center hover:bg-[#419372] transition-colors"
              >
                <Image
                  src="/footer/ytube.png"
                  alt="YouTube"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
