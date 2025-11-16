import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const pricingTiers = [
  {
    id: "self-service",
    name: "Self Service",
    description: "Set up Avni on your own for simple projects with up to 5 forms — perfect for quick, Google Form-style use cases.",
    price: "Free",
    priceSubtext: "No Credit Card Needed!",
    features: [
      "Develop Your Own And Reports Yourself",
      "Online Community Support Channel",
      "One Month Of Free Hosting",
      "Access To Documentation",
    ],
    cloudHosting: {
      title: "AVNI CLOUD HOSTING",
      subtitle: "( After 1 Month )",
      tiers: [
        "Up To 20 Users, 5k Forms/ Month, 500GB: ₹ 10,000/ Month",
        "Up To 100 Users, 10k Forms/ Month, 1TB: ₹ 15,000/Month",
        "More Than 100 Users: Custom Quote",
      ],
    },
    cta: {
      text: "Sign Up for Free",
      link: "/signup",
      variant: "primary" as const,
    },
  },
  {
    id: "assisted-self-service",
    name: "Assisted Self Service",
    description: "Learn Through Avni Training Sessions. Ideal For Teams That Want Guidance While Staying Hands-On.",
    price: "₹ 40,000",
    priceSubtext: "One Time Payment",
    features: [
      "12 Hours Of Live Training On Avni Platform",
      "8 Hours Of Consulting Support For 1 Month",
      "One Month Of Free Hosting",
      "Priority Support",
    ],
    cloudHosting: {
      title: "AVNI CLOUD HOSTING",
      subtitle: "( After 1 Month )",
      tiers: [
        "Up To 20 Users, 5k Forms/ Month, 200GB: ₹ 10,000/ Month",
        "Up To 100 Users, 10k Forms/ Month, 1TB: ₹ 15,000/Month",
        "More Than 100 Users: Custom Quote",
      ],
    },
    cta: {
      text: "Sign Up",
      link: "/signup",
      variant: "secondary" as const,
    },
  },
  {
    id: "avni-managed",
    name: "Avni Managed",
    description: "Let our team handle everything — from setup to rollout — for complex projects or when in-house capacity is limited.",
    price: "Custom",
    priceSubtext: "Decided Based On Consult",
    features: [
      "We Help You Build Avni To Your Needs",
      "Support For Migration From Existing Systems",
      "Integration With Other Systems",
      "Train Your Master Trainers",
    ],
    cloudHosting: {
      title: "AVNI CLOUD HOSTING",
      subtitle: "( After 1 Month )",
      tiers: [
        "Up To 20 Users, 5k Forms/ Month, 200GB: ₹ 7,000/Month",
        "Up To 100 Users, 10k Forms/ Month, 1TB: ₹ 10,000/Month",
        "More Than 100 Users: Custom Quote",
      ],
    },
    cta: {
      text: "Contact Us",
      link: "mailto:avnipartnerships@samanvayfoundation.org?subject=Avni%20Managed%20Custom%20Quote",
      variant: "secondary" as const,
    },
  },
];

export default function PricingCards() {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col"
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="font-anek font-bold text-[32px] leading-[28px] text-[#0b2540] mb-3">
                  {tier.name}
                </h3>
                <p className="font-noto text-base leading-relaxed text-[#4A4A4A]">
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="font-anek font-bold text-4xl md:text-5xl leading-tight text-[#0b2540] mb-2">
                  {tier.price}
                </p>
                <p className="font-noto font-normal text-[16px] leading-[16px] text-[#000000] opacity-60 italic">
                  {tier.priceSubtext}
                </p>
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h4 className="font-anek font-bold text-sm uppercase tracking-wide text-[#0b2540] mb-4">
                  WHAT'S INCLUDED
                </h4>
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => {
                    // Split to make "One Month" or "1 Month" bold
                    const parts = feature.split(/(One Month|1 Month)/g);
                    return (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5">
                          <Image
                            src="/icons/general/tick.svg"
                            alt="Check"
                            width={20}
                            height={20}
                            className="object-contain"
                          />
                        </div>
                        <span className="font-noto text-sm leading-relaxed text-[#4A4A4A]">
                          {parts.map((part, i) => 
                            part.match(/One Month|1 Month/) ? (
                              <span key={i} className="font-bold" style={{fontWeight: 700}}>{part}</span>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Cloud Hosting */}
              <div className="mb-8 flex-grow">
                {/* Title and subtitle on same line */}
                <div className="mb-3">
                  <h4 className="font-anek font-bold text-[16px] leading-[16px] uppercase tracking-normal text-[#000000] opacity-70 inline">
                    {tier.cloudHosting.title}
                  </h4>
                  <span className="font-noto text-xs text-[#6B7280] italic ml-1">
                    {tier.cloudHosting.subtitle}
                  </span>
                </div>
                
                {/* Gray box with only the list */}
                <div className="bg-[#F2F2F2] rounded-xl p-4 md:p-5">
                  <ul className="space-y-[6px]">
                    {tier.cloudHosting.tiers.map((hostingTier, index) => {
                      // Split the text to make pricing and Custom Quote bold
                      const parts = hostingTier.split(/(₹\s*[\d,]+\/\s*Month|Custom Quote)/g);
                      return (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[#419372] mt-1 flex-shrink-0">•</span>
                          <span className="font-noto text-[16px] leading-[24px] text-[#000000] opacity-80 break-words">
                            {parts.map((part, i) => 
                              part.match(/₹\s*[\d,]+\/\s*Month|Custom Quote/) ? (
                                <span key={i} className="font-bold font-noto whitespace-nowrap" style={{fontWeight: 700}}>{part}</span>
                              ) : (
                                <span key={i}>{part}</span>
                              )
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              {tier.cta.variant === "primary" ? (
                <Link
                  href={tier.cta.link}
                  className="w-full py-3.5 bg-[#419372] text-white rounded-full font-anek font-semibold text-base text-center hover:bg-[#357a5e] transition-all"
                >
                  {tier.cta.text}
                </Link>
              ) : (
                <Link
                  href={tier.cta.link}
                  className="w-full py-3.5 border-2 border-[#419372] text-[#419372] rounded-full font-anek font-semibold text-base text-center hover:bg-[#419372] hover:text-white transition-all"
                >
                  {tier.cta.text}
                </Link>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
