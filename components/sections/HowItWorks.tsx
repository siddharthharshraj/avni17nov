import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Settings, ClipboardList, LineChart, TrendingUp } from "lucide-react";

const steps = [
  {
    n: 1,
    Icon: Settings,
    title: "Setup",
    blurb: "Configure forms, workflows and roles in days, not months.",
  },
  {
    n: 2,
    Icon: ClipboardList,
    title: "Collect",
    blurb: "Field workers capture data offline on any Android device.",
  },
  {
    n: 3,
    Icon: LineChart,
    title: "Track",
    blurb: "Real-time dashboards keep every stakeholder aligned.",
  },
  {
    n: 4,
    Icon: TrendingUp,
    title: "Scale",
    blurb: "Roll out across districts, states and partners with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <Section bg="gray" spacing="lg">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="font-anek font-medium text-base md:text-lg text-[#fba47e] uppercase mb-3">
            How it works
          </p>
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
            A simple way to manage field programs.
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line on desktop */}
          <div
            className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-[#419372]/30"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
            {steps.map(({ n, Icon, title, blurb }) => (
              <li key={n} className="text-center relative">
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border-2 border-[#419372] mb-5 shadow-sm">
                  <Icon className="w-10 h-10 text-[#419372]" aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#FFD84D] text-[#0b2540] font-anek font-bold text-base flex items-center justify-center">
                    {n}
                  </span>
                </div>
                <h3 className="font-anek font-bold text-xl md:text-2xl text-[#0b2540] mb-2">
                  {title}
                </h3>
                <p className="font-noto text-base text-[#4A4A4A] max-w-xs mx-auto">
                  {blurb}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
