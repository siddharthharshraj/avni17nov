/**
 * Transparency You Can Trust Section
 * Exact Figma design implementation
 */

import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const features = [
  {
    id: "smarter-implementation",
    title: "Smarter Implementation, Stronger Insights",
    description: "Avni Helps You Streamline Programs And Capture Accurate Data For Monitoring And Evaluation.",
    icon: "/icons/smarter-implementation.png",
  },
  {
    id: "data-trust",
    title: "Data You Can Trust",
    description: "Gain Dependable Insights From Information Collected Through Your Team's Everyday Fieldwork.",
    icon: "/icons/data-trust.png",
  },
  {
    id: "see-impact",
    title: "See Impact In Real Time",
    description: "Turn Field Data Into Interactive Dashboards And Automated Reports That Highlight Progress Instantly.",
    icon: "/icons/see-impact.png",
  },
  {
    id: "seamless-data",
    title: "Seamless Data Flow",
    description: "Easily Export Your Data Or Connect Avni With Other Tools For Deeper Analysis And Collaboration.",
    icon: "/icons/seamless-data.png",
  },
];

export default function Transparency() {
  return (
    <Section spacing="lg" className="bg-[#E9EAF84D]">
      <Container>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-[60px]">
          <p className="font-anek font-medium text-sm md:text-base leading-tight text-[#fba47e] uppercase mb-4 md:mb-5">
            FOR DONORS
          </p>
          <h2 className="font-anek font-bold text-4xl md:text-5xl lg:text-[56px] leading-tight text-[#0b2540] mb-5 md:mb-6">
            Transparency You Can Trust
          </h2>
          <p className="font-noto text-base md:text-lg lg:text-[20px] leading-relaxed text-[#4A4A4A] max-w-3xl mx-auto px-4">
            Avni gives funders <span className="underline decoration-[#FFD84D] decoration-[3px] underline-offset-4">real-time visibility and reliable data</span> — turning impact into measurable insight.
          </p>
        </div>

        {/* Features Grid - 1→2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-x-20 lg:gap-y-[60px]">
          {features.map((feature) => (
            <div key={feature.id} className="flex gap-4 md:gap-6 items-start">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="relative w-10 h-10 md:w-12 md:h-12">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Title */}
                <h3 className="font-anek font-bold text-xl md:text-2xl lg:text-[24px] leading-tight text-[#0b2540] mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-noto text-base md:text-lg leading-relaxed text-[#4A4A4A]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
