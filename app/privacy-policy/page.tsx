/**
 * Privacy Policy Page
 * Legal information about data collection and usage
 */

import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import CopyEmailButton from '@/components/privacy-policy/CopyEmailButton';

export const metadata: Metadata = {
  title: 'Privacy Policy | Avni',
  description: 'Learn how Avni collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
  keywords: ['privacy policy', 'data protection', 'personal information', 'avni'],
  openGraph: {
    title: 'Privacy Policy | Avni',
    description: 'Learn how Avni collects, uses, and protects your personal information.',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-[72px]">
        {/* Hero Section */}
        <Section className="bg-gradient-to-b from-[#f8fffe] to-white py-12 md:py-16">
          <Container>
            <div className="max-w-4xl mx-auto text-center px-4">
              <h1 className="font-anek font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0b2540] mb-3">
                Privacy Policy
              </h1>
              <p className="font-noto text-sm md:text-base text-[#5a6c7d]">
                Last updated: 15-July-2024
              </p>
            </div>
          </Container>
        </Section>

        {/* Content Section */}
        <Section className="py-8 md:py-12">
          <Container>
            <div className="max-w-4xl mx-auto px-4">
              <div className="prose prose-lg max-w-none">
                {/* Introduction */}
                <div className="mb-8 md:mb-12">
                  <h2 className="font-anek font-bold text-xl sm:text-2xl md:text-3xl text-[#0b2540] mb-3 md:mb-4">
                    Introduction
                  </h2>
                  <p className="font-noto text-sm sm:text-base text-[#5a6c7d] leading-relaxed">
                    We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share information about you when you submit your details to contact us.
                  </p>
                </div>

                {/* Information We Collect */}
                <div className="mb-8 md:mb-12">
                  <h2 className="font-anek font-bold text-xl sm:text-2xl md:text-3xl text-[#0b2540] mb-3 md:mb-4">
                    Information We Collect
                  </h2>
                  <p className="font-noto text-sm sm:text-base text-[#5a6c7d] leading-relaxed mb-3 md:mb-4">
                    When you fill out the lead generation form, we may collect the following information:
                  </p>
                  <ul className="space-y-2 md:space-y-3 font-noto text-sm sm:text-base text-[#5a6c7d]">
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Name</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Email address</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Phone number</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Company name</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Job title</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Other details you choose to provide</span>
                    </li>
                  </ul>
                </div>

                {/* How We Use Your Information */}
                <div className="mb-8 md:mb-12">
                  <h2 className="font-anek font-bold text-xl sm:text-2xl md:text-3xl text-[#0b2540] mb-3 md:mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="font-noto text-sm sm:text-base text-[#5a6c7d] leading-relaxed mb-3 md:mb-4">
                    The information we collect will be used to:
                  </p>
                  <ul className="space-y-2 md:space-y-3 font-noto text-sm sm:text-base text-[#5a6c7d]">
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Send you Avni-related promotional materials, newsletters, and other updates via email</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Respond to your inquiries and provide customer support</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Improve our services and tailor content to your interests</span>
                    </li>
                  </ul>
                </div>

                {/* Sharing Your Information */}
                <div className="mb-8 md:mb-12">
                  <h2 className="font-anek font-bold text-xl sm:text-2xl md:text-3xl text-[#0b2540] mb-3 md:mb-4">
                    Sharing Your Information
                  </h2>
                  <p className="font-noto text-sm sm:text-base text-[#5a6c7d] leading-relaxed mb-3 md:mb-4">
                    We do not sell or rent your personal information to third parties. We may share your information with:
                  </p>
                  <ul className="space-y-2 md:space-y-3 font-noto text-sm sm:text-base text-[#5a6c7d]">
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Avni members (Samanvay Research and Development Foundation employees) who assist us in managing our communications and operations</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Legal authorities if required by law</span>
                    </li>
                  </ul>
                </div>

                {/* Your Choices */}
                <div className="mb-8 md:mb-12">
                  <h2 className="font-anek font-bold text-xl sm:text-2xl md:text-3xl text-[#0b2540] mb-3 md:mb-4">
                    Your Choices
                  </h2>
                  <p className="font-noto text-sm sm:text-base text-[#5a6c7d] leading-relaxed mb-3 md:mb-4">
                    You have the right to:
                  </p>
                  <ul className="space-y-2 md:space-y-3 font-noto text-sm sm:text-base text-[#5a6c7d]">
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Opt out of receiving promotional emails by following the unsubscribe link in the emails</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 group">
                      <span className="w-2 h-2 bg-[#419372] rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                      <span>Access, update, or delete your personal information by contacting us directly</span>
                    </li>
                  </ul>
                </div>

                {/* Data Security */}
                <div className="mb-8 md:mb-12">
                  <h2 className="font-anek font-bold text-xl sm:text-2xl md:text-3xl text-[#0b2540] mb-3 md:mb-4">
                    Data Security
                  </h2>
                  <p className="font-noto text-sm sm:text-base text-[#5a6c7d] leading-relaxed">
                    We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or misuse.
                  </p>
                </div>

                {/* Changes to This Policy */}
                <div className="mb-8 md:mb-12">
                  <h2 className="font-anek font-bold text-xl sm:text-2xl md:text-3xl text-[#0b2540] mb-3 md:mb-4">
                    Changes to This Policy
                  </h2>
                  <p className="font-noto text-sm sm:text-base text-[#5a6c7d] leading-relaxed">
                    We may update this Privacy Policy from time to time.
                  </p>
                </div>

                {/* Contact Us */}
                <div className="mb-8 md:mb-12">
                  <h2 className="font-anek font-bold text-xl sm:text-2xl md:text-3xl text-[#0b2540] mb-3 md:mb-4">
                    Contact Us
                  </h2>
                  <p className="font-noto text-sm sm:text-base text-[#5a6c7d] leading-relaxed mb-4 md:mb-6">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="bg-gradient-to-br from-[#f8fffe] to-[#f0fdf9] border border-[#419372]/20 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_4px_20px_rgba(65,147,114,0.08)] hover:shadow-[0_8px_30px_rgba(65,147,114,0.12)] transition-shadow">
                    <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#419372] rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-6">
                          <path d="M3 8L10.89 13.26C11.5 13.67 12.5 13.67 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-anek font-bold text-base sm:text-lg md:text-xl text-[#0b2540] mb-1">
                          Samanvay Research & Development Foundation
                        </p>
                        <p className="font-noto text-xs sm:text-sm text-[#5a6c7d]/80">
                          We're here to help with any privacy concerns
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 md:space-y-4">
                      {/* Address */}
                      <div className="flex items-start gap-2 md:gap-3">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5 sm:mt-1 text-[#419372] sm:w-5 sm:h-5">
                          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                        </svg>
                        <p className="font-noto text-xs sm:text-sm text-[#5a6c7d] leading-relaxed">
                          1st Floor, 147, 10th Cross Rd, Binnamangala, Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038, India
                        </p>
                      </div>

                      {/* Email with Copy Button */}
                      <div className="flex items-start sm:items-center gap-2 md:gap-3">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5 sm:mt-0 text-[#419372] sm:w-5 sm:h-5">
                          <path d="M3 8L10.89 13.26C11.5 13.67 12.5 13.67 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 min-w-0">
                          <a 
                            href="mailto:avnisupport@samanvayfoundation.org" 
                            className="font-noto text-xs sm:text-sm text-[#419372] hover:underline font-medium break-all"
                          >
                            avnisupport@samanvayfoundation.org
                          </a>
                          <CopyEmailButton email="avnisupport@samanvayfoundation.org" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
