/**
 * Why Choose Avni Section
 * Exact Figma design implementation
 */

import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const benefits = [
  {
    id: "affordable",
    title: "Affordable",
    description: "Pricing suited for non-profits. It is 70% more affordable than alternatives.",
    icon: "/icons/affordable.png",
  },
  {
    id: "sustained-partnerships",
    title: "Sustained Partnerships",
    description: "Partners continue year-on-year. We walk alongside you in your journey.",
    icon: "/icons/sustainable.png",
  },
  {
    id: "setup-in-minutes",
    title: "Setup In Minutes",
    description: "No coding required. Intuitive interface designed with field workers.",
    icon: "/icons/setup-in-minutes.png",
  },
  {
    id: "local-support",
    title: "Local Support",
    description: "Same timezone, same context. Easily accessible team that understands ground realities",
    icon: "/icons/local-support.png",
  },
];

export default function WhyChooseAvni() {
  return (
    <Section spacing="lg" className="bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-[60px]">
          <p className="font-anek font-medium text-xs md:text-sm leading-tight text-[#fba47e] uppercase mb-3 md:mb-4">
            SUSTAINABLE TECHNOLOGY FOR NGOS
          </p>
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540] mb-4 md:mb-6">
            Why Choose Avni?
          </h2>
          <p className="font-noto text-xl md:text-2xl lg:text-[22px] leading-relaxed text-[#4A4A4A] max-w-3xl mx-auto px-4">
            Still managing field data on paper? Avni helps you go digital — easily, affordably, and with the support you need at every step. Here's how we make your transition smooth and effective:
          </p>
        </div>

        {/* Benefits Grid - 1→2→4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-anek font-bold text-lg md:text-xl leading-tight text-[#0b2540] mb-3 md:mb-4">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="font-noto text-sm md:text-base leading-relaxed text-[#000000]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
