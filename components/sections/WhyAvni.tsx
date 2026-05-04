import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Compass, Smartphone, Handshake, Unlock, Brain } from "lucide-react";

const tiles = [
  {
    Icon: Compass,
    title: "Built by a non-profit",
    blurb: "We're funded by mission, not VCs. Pricing and roadmap stay aligned with the social sector.",
  },
  {
    Icon: Smartphone,
    title: "Field-ready",
    blurb: "Offline-first Android app designed for low-bandwidth, low-end devices in the field.",
  },
  {
    Icon: Handshake,
    title: "Partner mindset",
    blurb: "Local-language support, training, and a team that walks alongside you year on year.",
  },
  {
    Icon: Unlock,
    title: "Open source",
    blurb: "AGPL-licensed, hosted by you or by us. No vendor lock-in, ever.",
  },
];

export default function WhyAvni() {
  return (
    <Section bg="white" spacing="lg">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="font-anek font-medium text-base md:text-lg text-[#fba47e] uppercase mb-3">
            Why Avni
          </p>
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
            Different where it matters.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-6">
          {tiles.map(({ Icon, title, blurb }) => (
            <div
              key={title}
              className="rounded-2xl bg-white border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#419372]/10 mb-4">
                <Icon className="w-6 h-6 text-[#419372]" aria-hidden="true" />
              </div>
              <h3 className="font-anek font-bold text-xl md:text-2xl text-[#0b2540] mb-2">
                {title}
              </h3>
              <p className="font-noto text-base text-[#4A4A4A]">
                {blurb}
              </p>
            </div>
          ))}
        </div>

        {/* Hero tile — bigger, brand-coloured, per the brief's "make Job aid bigger" cue */}
        <div className="rounded-2xl bg-[#0b2540] text-white p-8 md:p-12 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFD84D]/20 flex-shrink-0">
              <Brain className="w-8 h-8 text-[#FFD84D]" aria-hidden="true" />
            </div>
            <div>
              <p className="font-anek font-medium text-sm text-[#FFD84D] uppercase mb-2">
                What sets us apart
              </p>
              <h3 className="font-anek font-bold text-2xl md:text-3xl lg:text-4xl mb-3">
                A job aid, not just data collection.
              </h3>
              <p className="font-noto text-base md:text-lg text-white/80">
                Avni doesn&apos;t just record what your team did — it guides them
                through the next right step. Decision support, reminders and
                protocols built into the daily workflow.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
