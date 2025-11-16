/**
 * Solutions That Power Your Programs
 * Exact Figma design implementation
 */

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const solutions = [
  {
    id: "case-management",
    title: "Case Management",
    description: "Track Individual And Household Progress Over Time With Organized, Field-Ready Case Records",
    icon: "/icons/case-management.png",
    cta: "Learn More >",
    ctaLink: "/solutions/case-management",
  },
  {
    id: "reporting",
    title: "Reporting",
    description: "Generate Accurate, Real-Time Reports To Monitor Program Performance And Demonstrate Impact",
    icon: "/icons/reporting.png",
    cta: "Learn More >",
    ctaLink: "/solutions/reporting",
  },
  {
    id: "cohort-research",
    title: "Cohort Based Research Studies",
    description: "Manage Longitudinal Studies With Structured Data Collection And Built-In Participant Tracking",
    icon: "/icons/cohort-based.png",
    cta: "Learn More >",
    ctaLink: "/solutions/research",
  },
  {
    id: "surveys",
    title: "Surveys",
    description: "Design And Deploy Quick, Customizable Surveys To Capture Feedback And Measure Outcomes",
    icon: "/icons/surveys.png",
    cta: "Sign Up For Early Access >",
    ctaLink: "/signup",
  },
  {
    id: "mobile-units",
    title: "Mobile Medical Units & Camps",
    description: "Empower Field Teams To Collect Data Offline During Visits And Community Camps With Ease",
    icon: "/icons/mobile-units.png",
    cta: "Request For Inquiry >",
    ctaLink: "/contact",
  },
];

export default function Solutions() {
  return (
    <Section spacing="lg">
      <Container>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540] mb-4 md:mb-6">
            Solutions That Power Your Programs
          </h2>
          <p className="font-noto text-xl md:text-2xl lg:text-[22px] leading-relaxed text-[#4A4A4A] max-w-3xl mx-auto">
            From case management to cohort studies, Avni adapts to diverse program needs — making data collection and monitoring effortless
          </p>
        </div>

        {/* Solutions Grid - 1→2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="relative w-12 h-12 md:w-16 md:h-16">
                    <Image
                      src={solution.icon}
                      alt={solution.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="font-anek font-bold text-lg md:text-xl leading-tight text-[#0b2540] mb-3">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="font-noto text-sm md:text-base leading-relaxed text-[#000000] mb-4">
                    {solution.description}
                  </p>

                  {/* CTA Link */}
                  <Link
                    href={solution.ctaLink}
                    className="font-noto font-bold text-sm leading-tight text-[#419372] hover:underline inline-flex items-center gap-1"
                  >
                    {solution.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
