import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Sprout, Wrench, Globe2 } from "lucide-react";

const pillars = [
  {
    Icon: Sprout,
    title: "Field-first",
    blurb: "Built around how field workers actually work — offline-first, low-end Android, simple flows.",
  },
  {
    Icon: Wrench,
    title: "Flexible",
    blurb: "Forms, indicators and workflows you can change without writing code.",
  },
  {
    Icon: Globe2,
    title: "Scalable",
    blurb: "From a single block to a multi-state programme, on the same platform.",
  },
];

export default function TheShift() {
  return (
    <Section bg="white" spacing="lg">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="font-anek font-medium text-base md:text-lg text-[#fba47e] uppercase mb-3">
            The shift
          </p>
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540] mb-5">
            Avni was built to change this.
          </h2>
          <p className="font-noto text-lg md:text-xl text-[#4A4A4A]">
            A platform shaped by years of working alongside frontline teams — not
            a generic tool retrofitted for the social sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {pillars.map(({ Icon, title, blurb }) => (
            <div key={title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1F7A63]/10 mb-5">
                <Icon className="w-8 h-8 text-[#1F7A63]" aria-hidden="true" />
              </div>
              <h3 className="font-anek font-bold text-2xl text-[#0b2540] mb-3">
                {title}
              </h3>
              <p className="font-noto text-base md:text-lg text-[#4A4A4A] max-w-xs mx-auto">
                {blurb}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
