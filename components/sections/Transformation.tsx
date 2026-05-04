import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const rows = [
  { before: "Paper registers", after: "Mobile data capture" },
  { before: "Delayed insights", after: "Real-time dashboards" },
  { before: "Reporting stress", after: "Easy reporting" },
  { before: "Rigid tools", after: "Flexible system" },
];

export default function Transformation() {
  return (
    <Section bg="white" spacing="lg">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="font-anek font-medium text-base md:text-lg text-[#fba47e] uppercase mb-3">
            The Avni difference
          </p>
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
            From paperwork to <span className="bg-[#FFD84D] px-2">real impact</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-5xl mx-auto">
          {/* Before */}
          <div className="rounded-2xl bg-red-50 border border-red-100 p-6 md:p-8">
            <h3 className="font-anek font-bold text-xl md:text-2xl text-red-700 mb-6">
              Before Avni
            </h3>
            <ul className="space-y-4">
              {rows.map((row) => (
                <li
                  key={row.before}
                  className="flex items-start gap-3 font-noto text-base md:text-lg text-[#4A4A4A]"
                >
                  <span className="text-red-500 text-xl leading-none mt-0.5" aria-hidden="true">
                    ✕
                  </span>
                  <span>{row.before}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 md:p-8">
            <h3 className="font-anek font-bold text-xl md:text-2xl text-[#1F7A63] mb-6">
              With Avni
            </h3>
            <ul className="space-y-4">
              {rows.map((row) => (
                <li
                  key={row.after}
                  className="flex items-start gap-3 font-noto text-base md:text-lg text-[#0b2540]"
                >
                  <span className="text-[#1F7A63] text-xl leading-none mt-0.5" aria-hidden="true">
                    ✓
                  </span>
                  <span>{row.after}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
