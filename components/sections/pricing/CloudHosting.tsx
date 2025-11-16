import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function CloudHosting() {
  const features = [
    "Hosting of your application on the Avni cloud",
    "Regular upgrades of Avni and other components",
    "Data backups",
    "Maintenance of the Avni application on the PlayStore",
    "Priority support on end-user applications",
    "Pre-installed community version of Metabase or Superset (pick one)",
  ];

  return (
    <Section spacing="lg" className="bg-white">
      <Container>
        <div className="max-w-full">
          {/* Header */}
          <div className="mb-8 md:mb-10">
            <h2 className="font-anek font-bold text-2xl md:text-3xl lg:text-[36px] leading-tight md:leading-[40px] text-[#0B2540] mb-4 md:mb-6">
              Avni Cloud Hosting
            </h2>
            <p className="font-noto font-normal text-base md:text-lg lg:text-[24px] leading-relaxed md:leading-[36px] text-[#000000] max-w-4xl">
              Once you develop your application, it can be hosted on the Avni cloud. See the plans above to get a better understanding of your options.
            </p>
          </div>

          {/* Features List */}
          <div className="mb-8 max-w-4xl">
            <ul className="space-y-3 md:space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#419372] mt-1 md:mt-1.5 text-base md:text-lg flex-shrink-0">•</span>
                  <span className="font-noto font-normal text-base md:text-lg lg:text-[24px] leading-relaxed md:leading-[36px] text-[#000000]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Link */}
          <p className="font-noto font-normal text-base md:text-lg lg:text-[24px] leading-relaxed md:leading-[36px] text-[#000000] max-w-4xl">
            Refer to our detailed{" "}
            <Link
              href="/faq"
              className="text-[#000000] underline decoration-[#419372] decoration-[3px] underline-offset-2 hover:text-[#419372] transition-colors"
            >
              FAQ guide
            </Link>{" "}
            for a better understanding
          </p>
        </div>
      </Container>
    </Section>
  );
}
