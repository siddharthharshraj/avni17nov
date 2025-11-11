/**
 * About Page
 * Complete about section with hero, mission cards, and newsletter subscription
 */

import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'About Us - Avni | Shaping Tomorrow, Today',
  description: 'Learn about Avni, an open-source platform supporting community health workers and grassroots organizations across India since 2016.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-[72px]">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-16 xl:px-24 py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Content */}
            <div className="space-y-6 max-w-[580px]">
              <p className="font-anek font-bold text-[14px] leading-[20px] text-[#fba57f] uppercase tracking-[0.5px]">
                WHO ARE WE?
              </p>
              
              <h1 className="font-anek font-medium text-[48px] sm:text-[64px] lg:text-[80px] leading-[1.1] text-[#0b2540] -mt-2">
                Shaping Tomorrow,{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Today!</span>
                  <span className="absolute bottom-[6px] left-0 right-0 h-[10px] bg-[#FFD84D] -z-0"></span>
                </span>
              </h1>
              
              <p className="text-[18px] lg:text-[20px] leading-[1.6] text-[rgba(0,0,0,0.75)] font-noto pt-2">
                Avni started in 2016 as an open-source platform to support community health workers at the grassroots level. It has since evolved to serve diverse fieldwork needs across sectors like water, education, social welfare, and health. The name <span className="font-semibold text-[#419372]">Avni (अवनि)</span> means "earth" in Hindi, symbolising its deep connection to the ground realities it serves.
              </p>
            </div>

            {/* Right Content - India Map (SVG already contains markers) */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[600px] lg:max-w-[684px] aspect-[1/1]">
                <Image
                  src="/icons/general/indian-map.svg"
                  alt="India Map showing Avni's reach across 40 NGOs and 25 States"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Cards Section */}
      <section className="relative px-6 lg:px-16 xl:px-24 py-20 lg:py-28 bg-[#f5f5f5]">
        <div className="max-w-[1440px] mx-auto">
          {/* Top Row - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 lg:mb-24">
            {/* Left Column - Mission Statement */}
            <div>
              <h2 className="font-anek font-bold text-[28px] lg:text-[36px] leading-[1.3] text-[#0a1f3d] tracking-tight">
                Avni was designed to make the most of scarce philanthropic resources — creating an{' '}
                <span className="bg-[#FFD84D] px-1.5 py-1 box-decoration-clone">affordable, scalable, and comprehensive digital tool</span>
                {' '}for all non-profit organisations.
              </h2>
            </div>

            {/* Right Column - Team Description */}
            <div className="space-y-7">
              <p className="font-noto font-normal text-[16px] lg:text-[17px] leading-[1.75] text-[#4a5568] tracking-[0.01em]">
                Avni was built by a team of technologists and practitioners who have spent decades creating technology that serves real people — especially those working on the frontlines of social change.
              </p>
              <p className="font-noto font-normal text-[16px] lg:text-[17px] leading-[1.75] text-[#4a5568] tracking-[0.01em]">
                Together, they bring over two decades each of experience in software design, consulting, and large-scale product development. Having worked with ThoughtWorks, governments, and non-profits, they have seen firsthand how technology can empower grassroots programs — and where it often falls short.
              </p>
            </div>
          </div>

          {/* Bottom Row - 3 Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {/* Card 1 - Collaborative */}
            <div className="bg-white rounded-[18px] px-7 py-8 lg:px-8 lg:py-9 space-y-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-shadow">
              <h3 className="font-anek font-bold text-[20px] lg:text-[22px] leading-[1.35] text-[#0a1f3d]">
                Collaborative And Sustainable By Design
              </h3>
              <p className="font-noto font-normal text-[15px] lg:text-[16px] leading-[1.7] text-[#5a6c7d]">
                Avni was created through partnerships with NGOs and governments, using shared learning and open-source principles to make digital transformation affordable and long-lasting.
              </p>
            </div>

            {/* Card 2 - Tech Expertise */}
            <div className="bg-white rounded-[18px] px-7 py-8 lg:px-8 lg:py-9 space-y-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-shadow">
              <h3 className="font-anek font-bold text-[20px] lg:text-[22px] leading-[1.35] text-[#0a1f3d]">
                Tech Expertise, Grounded In Field Reality
              </h3>
              <p className="font-noto font-normal text-[15px] lg:text-[16px] leading-[1.7] text-[#5a6c7d]">
                With decades of experience in software design and implementation, the Avni team combines technical excellence with a deep understanding of the challenges faced by fieldworkers and non-profits.
              </p>
            </div>

            {/* Card 3 - Purpose Driven */}
            <div className="bg-white rounded-[18px] px-7 py-8 lg:px-8 lg:py-9 space-y-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-shadow">
              <h3 className="font-anek font-bold text-[20px] lg:text-[22px] leading-[1.35] text-[#0a1f3d]">
                Purpose-Driven. Impact-Proven.
              </h3>
              <p className="font-noto font-normal text-[15px] lg:text-[16px] leading-[1.7] text-[#5a6c7d]">
                Since 2016, the team has grown Avni into a trusted platform that supports over 60 NGOs across multiple sectors — helping them turn data into insights, and insights into impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="relative px-6 lg:px-16 xl:px-24 py-20 lg:py-24 bg-[#e9eaf8]">
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          <h2 className="font-anek font-bold text-[32px] lg:text-[36px] leading-[1.2] text-[#0b2540]">
            Stay Connected With Avni
          </h2>
          
          <p className="font-noto text-[18px] lg:text-[20px] leading-[1.6] text-[rgba(0,0,0,0.75)] max-w-[680px] mx-auto">
            Get the latest updates, releases, and event news in your inbox. Join to engage with the growing Avni community.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-4 max-w-[540px] mx-auto">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full sm:flex-1 h-[52px] px-6 border border-[#d0d0d0] rounded-[26px] text-[16px] font-noto placeholder:text-[#999] focus:outline-none focus:border-[#419372] focus:ring-2 focus:ring-[#419372]/20 transition-all bg-white"
            />
            <button className="w-full sm:w-auto px-8 h-[52px] bg-[#419372] text-white font-anek font-semibold text-[18px] rounded-[26px] hover:bg-[#357a5e] active:scale-[0.98] transition-all shadow-md hover:shadow-lg whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
