'use client';

import { useState } from 'react';
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { Copy, Check, ExternalLink } from "lucide-react";

interface DemoAccount {
  id: string;
  useCase: string;
  description: string;
  loginId: string;
  password: string;
  dashboardLink?: string;
}

const demoAccounts: DemoAccount[] = [
  {
    id: "water-body",
    useCase: "Water Body Excavation",
    description: "Track the progress of silt excavation from water bodies",
    loginId: "demo@wbd",
    password: "password",
  },
  {
    id: "social-security",
    useCase: "Social Security Facilitation",
    description: "Manage social security program beneficiaries",
    loginId: "demo@ssdemo",
    password: "password",
  },
  {
    id: "teacher-development",
    useCase: "Teacher Development Program",
    description: "Track teacher training and development",
    loginId: "demo@teachdemo",
    password: "password",
  },
  {
    id: "community-phulwari",
    useCase: "Community Program - Phulwari",
    description: "Early childhood care and education program",
    loginId: "phulwari-user@cpdemo",
    password: "password",
  },
  {
    id: "ncd-control",
    useCase: "NCD Control Program",
    description: "Non-communicable disease prevention and management",
    loginId: "ncd-user@cpdemo",
    password: "password",
  },
  {
    id: "pregnancy-nutrition",
    useCase: "Pregnancy & Child Nutrition",
    description: "Maternal and child health tracking",
    loginId: "preg-child@cpdemo",
    password: "password",
  },
  {
    id: "waste-management",
    useCase: "Waste Management Program",
    description: "Track waste collection and management",
    loginId: "demo@wmdemo",
    password: "password",
    dashboardLink: "https://reporting.avniproject.org/public/dashboard/14c0f214-d55c-4b3b-8dfa-550d3d969796?date_range=",
  },
];

export default function DemoAccounts() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <Container>
        <h2 className="font-anek font-bold text-2xl md:text-3xl lg:text-4xl text-[#0b2540] mb-6 md:mb-8 px-4 md:px-0">
          Demo Accounts & Credentials
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 px-4 md:px-0">
          {/* Main Content - Single Bordered Component */}
          <div className="lg:col-span-8 w-full">
            <div className="bg-white border border-[#E8E8E8] rounded-[16px] md:rounded-[20px] p-4 md:p-6 lg:p-8 w-full max-w-[934px] relative" style={{ borderWidth: '1px' }}>
              {/* Continuous Vertical Line - Desktop Only */}
              <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-[#E8E8E8]" style={{ transform: 'translateX(-12px)' }}></div>
              
              {/* Desktop Headers - Only Once */}
              <div className="hidden md:grid grid-cols-2 gap-6 mb-6">
                <div className="pr-6">
                  <h4 className="font-anek font-bold text-[16px] leading-[16px] uppercase tracking-[0px] text-[#000000]">
                    USE CASE
                  </h4>
                </div>
                <div className="pl-6">
                  <h4 className="font-anek font-bold text-[16px] leading-[16px] uppercase tracking-[0px] text-[#000000]">
                    CREDENTIALS
                  </h4>
                </div>
              </div>

              {/* Mobile: Card-based layout, Desktop: Two-column layout */}
              <div className="space-y-4 md:space-y-8">
                {demoAccounts.map((account, index) => (
                  <div key={account.id}>
                    {/* Mobile: Individual Card per Account */}
                    <div className="md:hidden bg-[#F9F9F9] rounded-[12px] p-4 space-y-4">
                      {/* Use Case Section */}
                      <div>
                        <h3 className="font-noto font-bold text-[18px] leading-[24px] text-[#000000] mb-2">
                          {account.useCase}
                        </h3>
                        <p className="font-noto font-normal text-[14px] leading-[22px] text-[#000000] mb-3">
                          {account.description}
                        </p>
                      </div>

                      {/* Credentials Section */}
                      <div className="bg-white rounded-[8px] p-3 space-y-2">
                        <p className="font-noto font-bold text-[14px] leading-[20px] text-[#000000] mb-2">
                          Avni App login
                        </p>
                        
                        {/* Login ID */}
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-noto text-[13px] leading-[20px] text-[#000000] break-all">
                              <span className="font-bold">Login:</span> {account.loginId}
                            </p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.loginId, `${account.id}-login`)}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                            title="Copy Login ID"
                          >
                            {copiedField === `${account.id}-login` ? (
                              <Check className="w-3.5 h-3.5 text-[#419372]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-[#6B7280]" />
                            )}
                          </button>
                        </div>

                        {/* Password */}
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-noto text-[13px] leading-[20px] text-[#000000]">
                              <span className="font-bold">Password:</span> {account.password}
                            </p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(account.password, `${account.id}-password`)}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                            title="Copy Password"
                          >
                            {copiedField === `${account.id}-password` ? (
                              <Check className="w-3.5 h-3.5 text-[#419372]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-[#6B7280]" />
                            )}
                          </button>
                        </div>

                        {/* Dashboard Link */}
                        {account.dashboardLink && (
                          <Link
                            href={account.dashboardLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-noto font-bold text-[13px] leading-[20px] text-[#419372] hover:text-[#357a5e] transition-colors mt-2"
                          >
                            View Dashboard
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Desktop: Two-column layout */}
                    <div className="hidden md:grid grid-cols-2 gap-6">
                      {/* Use Case */}
                      <div className="pr-6">
                        <h3 className="font-noto font-bold text-[20px] leading-[26px] tracking-[0px] text-[#000000] mb-2">
                          {account.useCase}
                        </h3>
                        <p className="font-noto font-normal text-[16px] leading-[26px] tracking-[0px] text-[#000000]">
                          {account.description}
                        </p>
                      </div>

                      {/* Credentials */}
                      <div className="pl-6">
                        <div className="space-y-3">
                          <div className="font-noto">
                            <p className="font-noto font-bold text-[16px] leading-[26px] tracking-[0px] text-[#000000] mb-1">
                              Avni App login
                            </p>
                            
                            {/* Login ID */}
                            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                              <span className="font-noto font-normal text-[16px] leading-[26px] tracking-[0px] text-[#000000] break-all">
                                <span className="font-bold">Login Id:</span> {account.loginId}
                              </span>
                              <button
                                onClick={() => copyToClipboard(account.loginId, `${account.id}-login`)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors group relative flex-shrink-0"
                                title="Copy Login ID"
                              >
                                {copiedField === `${account.id}-login` ? (
                                  <Check className="w-3 h-3 text-[#419372]" />
                                ) : (
                                  <Copy className="w-3 h-3 text-[#6B7280] group-hover:text-[#419372]" />
                                )}
                              </button>
                            </div>

                            {/* Password */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-noto font-normal text-[16px] leading-[26px] tracking-[0px] text-[#000000]">
                                <span className="font-bold">Password:</span> {account.password}
                              </span>
                              <button
                                onClick={() => copyToClipboard(account.password, `${account.id}-password`)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors group relative flex-shrink-0"
                                title="Copy Password"
                              >
                                {copiedField === `${account.id}-password` ? (
                                  <Check className="w-3 h-3 text-[#419372]" />
                                ) : (
                                  <Copy className="w-3 h-3 text-[#6B7280] group-hover:text-[#419372]" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Dashboard Link */}
                          {account.dashboardLink && (
                            <Link
                              href={account.dashboardLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 font-noto font-bold text-[16px] leading-[26px] tracking-[0px] text-[#419372] hover:text-[#357a5e] transition-colors"
                            >
                              View Dashboard
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 w-full">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white border border-[#E8E8E8] rounded-[16px] md:rounded-[20px] p-4 md:p-6 w-full max-w-[310px] mx-auto lg:mx-0" style={{ borderWidth: '1px' }}>
                {/* Download App Section */}
                <div className="mb-4 md:mb-6">
                  <h3 className="font-anek font-bold text-xs md:text-sm uppercase tracking-wide text-[#0b2540] mb-3 md:mb-4">
                    RELEVANT LINKS
                  </h3>
                  <p className="font-noto text-sm md:text-base text-[#000000] mb-2 md:mb-3">
                    Download Avni App
                  </p>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.openchsclient&hl=en_IN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <div className="relative w-[140px] md:w-[160px] h-[42px] md:h-[48px]">
                      <Image
                        src="/footer/google-play.png"
                        alt="Get it on Google Play"
                        fill
                        className="object-contain hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </Link>
                </div>

                {/* Separator */}
                <div className="border-t border-[#E8E8E8] my-4 md:my-6"></div>

                {/* Get Started Section */}
                <div>
                  <h3 className="font-anek font-bold text-xs md:text-sm uppercase tracking-wide text-[#0b2540] mb-3 md:mb-4">
                    GET STARTED
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    <Link
                      href="https://reporting.avniproject.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-noto text-sm md:text-base text-[#000000] mb-3 md:mb-4 hover:text-[#419372] transition-colors"
                    >
                      Explore Avni Web Console
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full text-center py-2 md:py-2.5 px-4 md:px-6 bg-[#419372] text-white rounded-full font-anek font-semibold text-sm md:text-base hover:bg-[#357a5e] transition-all"
                    >
                      Sign Up for Free
                    </Link>
                    <Link
                      href="mailto:avnipartnerships@samanvayfoundation.org?subject=Demo%20Inquiry"
                      className="block w-full text-center py-2 md:py-2.5 px-4 md:px-6 border-2 border-[#419372] text-[#419372] rounded-full font-anek font-semibold text-sm md:text-base hover:bg-[#419372] hover:text-white transition-all"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
