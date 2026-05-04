import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const stats = [
  { value: "60+", label: "Projects" },
  { value: "11M+", label: "Beneficiaries" },
  { value: "10,000+", label: "Users" },
  { value: "70%", label: "Retention" },
];

export default function Impact() {
  return (
    <Section bg="white" spacing="lg">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="font-anek font-medium text-base md:text-lg text-[#fba47e] uppercase mb-3">
            Impact
          </p>
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
            Proven at scale.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-anek font-bold text-5xl md:text-6xl lg:text-7xl text-[#0b2540] mb-2 leading-none">
                {s.value}
              </p>
              <p className="font-anek font-medium text-base md:text-lg text-[#9CA3AF] uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* TODO(phase-4): India heatmap visual showing project locations */}
      </Container>
    </Section>
  );
}
