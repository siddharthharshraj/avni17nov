/**
 * About Page
 * Complete about section with hero, mission cards, and newsletter subscription
 */

import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { founders, team } from '@/data/team';

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
      <section className="relative px-4 sm:px-6 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 max-w-[580px]">
              <p className="font-anek font-bold text-[12px] sm:text-[14px] leading-[20px] text-[#fba57f] uppercase tracking-[0.5px]">
                WHO ARE WE?
              </p>
              
              <h1 className="font-anek font-medium text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[1.1] text-[#0b2540]">
                Shaping Tomorrow,{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Today!</span>
                  <span className="absolute bottom-[4px] sm:bottom-[6px] left-0 right-0 h-[8px] sm:h-[10px] bg-[#FFD84D] -z-0"></span>
                </span>
              </h1>
              
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.6] text-[rgba(0,0,0,0.75)] font-noto pt-2">
                Avni started in 2016 as an open-source platform to support community health workers at the grassroots level. It has since evolved to serve diverse fieldwork needs across sectors like water, education, social welfare, and health. The name <span className="font-semibold text-[#419372]">Avni (अवनि)</span> means "earth" in Hindi, symbolising its deep connection to the ground realities it serves.
              </p>
            </div>

            {/* Right Content - About Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[650px]">
                <Image
                  src="/images/about/about-page-hero.png"
                  alt="Avni - Shaping Tomorrow, Today"
                  width={650}
                  height={650}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Cards Section */}
      <section className="relative px-4 sm:px-6 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20 xl:py-28 bg-[#f5f5f5]">
        <div className="max-w-[1440px] mx-auto">
          {/* Top Row - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
            {/* Left Column - Mission Statement */}
            <div>
              <h2 className="font-anek font-bold text-[24px] sm:text-[28px] lg:text-[36px] leading-[1.3] text-[#0a1f3d] tracking-tight">
                Avni was designed to make the most of scarce philanthropic resources — creating an{' '}
                <span className="bg-[#FFD84D] px-1.5 py-1 box-decoration-clone">affordable, scalable, and comprehensive digital tool</span>
                {' '}for all non-profit organisations.
              </h2>
            </div>

            {/* Right Column - Team Description */}
            <div className="space-y-5 sm:space-y-7">
              <p className="font-noto font-normal text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] text-[#4a5568] tracking-[0.01em]">
                Avni was built by a team of technologists and practitioners who have spent decades creating technology that serves real people — especially those working on the frontlines of social change.
              </p>
              <p className="font-noto font-normal text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] text-[#4a5568] tracking-[0.01em]">
                Together, they bring over two decades each of experience in software design, consulting, and large-scale product development. Having worked with ThoughtWorks, governments, and non-profits, they have seen firsthand how technology can empower grassroots programs — and where it often falls short.
              </p>
            </div>
          </div>

          {/* Bottom Row - 3 Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
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

      {/* Team Section */}
      <section className="relative px-4 sm:px-6 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20 xl:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto">
          {/* Our Founders */}
          <div className="text-center mb-8 sm:mb-12">
            <p className="font-anek font-medium text-[12px] sm:text-[14px] leading-[20px] text-[#fba57f] uppercase tracking-[0.5px] mb-3 sm:mb-4">
              MEET THE MINDS BEHIND AVNI
            </p>
            <h2 className="font-anek font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-[1.2] text-[#0b2540] mb-10 sm:mb-12 lg:mb-16">
              Our Founders
            </h2>
            
            {/* Founders Grid */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
              {founders.map((founder, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="relative w-[175px] h-[175px] rounded-full overflow-hidden bg-[#FFE5D9] mb-4 ring-4 ring-transparent group-hover:ring-[#419372]/20 transition-all">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover"
                      style={{ mixBlendMode: 'darken' }}
                    />
                  </div>
                  <h3 className="font-anek font-medium text-[20px] text-[#0b2540] mb-2">
                    {founder.name}
                  </h3>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                    aria-label={`${founder.name}'s LinkedIn profile`}
                  >
                    <Image
                      src="/icons/social/linkedin.svg"
                      alt="LinkedIn"
                      width={18}
                      height={18}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Our Team Today */}
          <div className="text-center">
            <h2 className="font-anek font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-[1.2] text-[#0b2540] mb-8 sm:mb-10 lg:mb-12">
              Our Team Today
            </h2>
            
            {/* Team Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 max-w-[1200px] mx-auto">
              {team.map((member, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-full overflow-hidden bg-[#FFE5D9] mb-3 ring-4 ring-transparent group-hover:ring-[#419372]/20 transition-all">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      style={{ mixBlendMode: 'darken' }}
                    />
                  </div>
                  <h3 className="font-anek font-medium text-[16px] sm:text-[18px] text-[#0b2540] mb-2 text-center">
                    {member.name}
                  </h3>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Image
                      src="/icons/social/linkedin.svg"
                      alt="LinkedIn"
                      width={18}
                      height={18}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find Us At Section */}
      <section className="relative px-4 sm:px-6 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto">
          {/* Single Card with Border */}
          <div className="max-w-[1178px] mx-auto border border-[#E6E6E6] rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 lg:p-12 bg-white">
            <h2 className="font-anek font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-[1.2] text-[#0b2540] mb-6 sm:mb-8 lg:mb-10 text-center">
              Find Us At
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Office Address */}
              <div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.0015 11.8333C12.506 11.8333 12.9374 11.6536 13.2958 11.2942C13.6541 10.9351 13.8333 10.5032 13.8333 9.9985C13.8333 9.494 13.6536 9.06258 13.2943 8.70425C12.9351 8.34592 12.5032 8.16675 11.9985 8.16675C11.494 8.16675 11.0626 8.34642 10.7043 8.70575C10.3459 9.06492 10.1668 9.49683 10.1668 10.0015C10.1668 10.506 10.3464 10.9374 10.7058 11.2957C11.0649 11.6541 11.4968 11.8333 12.0015 11.8333ZM12 19.8C14.1555 17.8333 15.7499 16.0486 16.7833 14.4458C17.8166 12.8431 18.3333 11.4278 18.3333 10.2C18.3333 8.28567 17.7219 6.71817 16.4992 5.4975C15.2766 4.277 13.7768 3.66675 12 3.66675C10.2232 3.66675 8.72342 4.277 7.50075 5.4975C6.27808 6.71817 5.66675 8.28567 5.66675 10.2C5.66675 11.4278 6.19175 12.8431 7.24175 14.4458C8.29175 16.0486 9.87783 17.8333 12 19.8ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z" fill="#FF8854"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-anek font-bold text-[16px] leading-[16px] text-[#000000] uppercase tracking-[0px] mb-3">
                      OFFICE ADDRESS
                    </h3>
                    <p className="font-noto text-[16px] leading-[1.7] text-[#000000]">
                      Samanvay Foundation<br />
                      147, 1st Floor, 10th Cross Rd, Binnamangala,<br />
                      Hoysala Nagar, Indiranagar,<br />
                      Bengaluru, Karnataka 560038
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.66675 20C3.21675 20 2.82642 19.8348 2.49575 19.5042C2.16525 19.1736 2 18.7833 2 18.3333V5.66675C2 5.21675 2.16525 4.82642 2.49575 4.49575C2.82642 4.16525 3.21675 4 3.66675 4H20.3333C20.7833 4 21.1736 4.16525 21.5043 4.49575C21.8348 4.82642 22 5.21675 22 5.66675V18.3333C22 18.7833 21.8348 19.1736 21.5043 19.5042C21.1736 19.8348 20.7833 20 20.3333 20H3.66675ZM12 12.6333L3.66675 7.25V18.3333H20.3333V7.25L12 12.6333ZM12 10.9667L20.2668 5.66675H3.75L12 10.9667ZM3.66675 7.25V5.66675V18.3333V7.25Z" fill="#FF8854"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-anek font-bold text-[16px] leading-[16px] text-[#000000] uppercase tracking-[0px] mb-3">
                      CONTACT
                    </h3>
                    <a 
                      href="mailto:avnipartnerships@samanvayfoundation.org"
                      className="font-noto text-[16px] leading-[1.7] text-[#419372] hover:underline break-all"
                    >
                      avnipartnerships@samanvayfoundation.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
