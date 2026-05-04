import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { HeartHandshake, Landmark, Building2 } from "lucide-react";

const audiences = [
  {
    Icon: HeartHandshake,
    title: "NGOs",
    blurb: "Spend less time on paperwork, more time in the field.",
  },
  {
    Icon: Landmark,
    title: "Funders",
    blurb: "Get transparent, real-time visibility into program outcomes.",
  },
  {
    Icon: Building2,
    title: "Governments",
    blurb: "Scale evidence-based programs across districts and states.",
  },
];

export default function WhoItsFor() {
  return (
    <Section bg="gray" spacing="lg">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="font-anek font-medium text-base md:text-lg text-[#fba47e] uppercase mb-3">
            Who it&apos;s for
          </p>
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
            Built for the people behind every program.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {audiences.map(({ Icon, title, blurb }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#419372]/10 mb-5">
                <Icon className="w-7 h-7 text-[#419372]" aria-hidden="true" />
              </div>
              <h3 className="font-anek font-bold text-2xl text-[#0b2540] mb-3">
                {title}
              </h3>
              <p className="font-noto text-base md:text-lg text-[#4A4A4A]">
                {blurb}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
