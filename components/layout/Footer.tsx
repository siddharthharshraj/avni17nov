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
            <h4 className="font-anek font-bold text-[16px] sm:text-[18px] md:text-[20px] leading-tight text-[#E9EAF8A3] mb-4 md:mb-6 uppercase tracking-[0px]">
              PRODUCT
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="https://avni.readme.io/docs/getting-started" target="_blank" rel="noopener noreferrer" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Introduction
                </a>
              </li>
              <li>
                <a href="https://avni.readme.io/docs/architecture" target="_blank" rel="noopener noreferrer" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Design
                </a>
              </li>
              <li>
                <a href="https://avni.readme.io/docs/database-guide" target="_blank" rel="noopener noreferrer" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Database Guide
                </a>
              </li>
              <li>
                <a href="https://avni.readme.io/docs/environment-setup-guides" target="_blank" rel="noopener noreferrer" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <Link href="/roadmap" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - COMPANY */}
          <div>
            <h4 className="font-anek font-bold text-[16px] sm:text-[18px] md:text-[20px] leading-tight text-[#E9EAF8A3] mb-4 md:mb-6 uppercase tracking-[0px]">
              COMPANY
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="https://avni.readme.io/docs/avni-code-of-conduct" target="_blank" rel="noopener noreferrer" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Code Of Conduct
                </a>
              </li>
              <li>
                <Link href="/privacy-policy" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - RESOURCES */}
          <div>
            <h4 className="font-anek font-bold text-[16px] sm:text-[18px] md:text-[20px] leading-tight text-[#E9EAF8A3] mb-4 md:mb-6 uppercase tracking-[0px]">
              RESOURCES
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="https://avni.readme.io/docs/getting-started" target="_blank" rel="noopener noreferrer" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <Link href="/resources/case-studies" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources/events" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" className="font-noto font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[0px] text-[#FFFFFF] hover:text-[#419372] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - DOWNLOAD AVNI APP */}
          <div>
            <h4 className="font-anek font-bold text-[16px] sm:text-[18px] md:text-[20px] leading-tight text-[#E9EAF8A3] mb-4 md:mb-6 uppercase tracking-[0px]">
              DOWNLOAD AVNI APP
            </h4>
            
            {/* Google Play Button */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.openchsclient&hl=en_IN" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mb-[32px] hover:opacity-80 transition-opacity"
            >
              <div className="relative w-[257px] h-[75px]">
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
              <h5 className="font-anek font-bold text-[20px] leading-[20px] text-[#E9EAF8A3] mb-[16px] uppercase tracking-[0px]">
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
        <div className="border-t border-white/20 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            {/* Copyright */}
            <p className="font-anek font-normal text-[12px] sm:text-[14px] md:text-[16px] leading-[18px] sm:leading-[20px] md:leading-[12px] tracking-[0px] uppercase text-[#FFFFFF] text-center md:text-left">
              ALL RIGHTS RESERVED ©AVNI-PROJECT | OPEN SOURCE | MADE WITH <span className="text-red-500">❤️</span> IN INDIA
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 md:gap-4">
              <a 
                href="https://www.facebook.com/avniproject" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[48px] h-[48px] rounded-full bg-white/10 flex items-center justify-center hover:bg-[#419372] transition-colors"
              >
                <Image
                  src="/footer/fb-new.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </a>
              <a 
                href="https://github.com/avniproject" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[48px] h-[48px] rounded-full bg-white/10 flex items-center justify-center hover:bg-[#419372] transition-colors"
              >
                <Image
                  src="/footer/github.png"
                  alt="GitHub"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </a>
              <a 
                href="https://www.linkedin.com/showcase/avniproject/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[48px] h-[48px] rounded-full bg-white/10 flex items-center justify-center hover:bg-[#419372] transition-colors"
              >
                <Image
                  src="/footer/linkedin-new.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </a>
              <a 
                href="https://x.com/avniproject" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[48px] h-[48px] rounded-full bg-white/10 flex items-center justify-center hover:bg-[#419372] transition-colors"
              >
                <Image
                  src="/footer/x-new.png"
                  alt="X (Twitter)"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </a>
              <a 
                href="https://www.youtube.com/@avniproject" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-[48px] h-[48px] rounded-full bg-white/10 flex items-center justify-center hover:bg-[#419372] transition-colors"
              >
                <Image
                  src="/footer/ytube.png"
                  alt="YouTube"
                  width={24}
                  height={24}
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
