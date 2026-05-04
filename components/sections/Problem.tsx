import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const problems = [
  { icon: "📄", label: "Paper" },
  { icon: "⏳", label: "Delays" },
  { icon: "📊", label: "Tracking" },
  { icon: "😰", label: "Reporting" },
  { icon: "💸", label: "Expensive" },
];

export default function Problem() {
  return (
    <Section bg="gray" spacing="lg">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
            Field programs are complex.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
          {problems.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl md:text-5xl mb-3" aria-hidden="true">
                {item.icon}
              </div>
              <p className="font-anek font-semibold text-base md:text-lg text-[#0b2540]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <p className="font-noto text-lg md:text-xl text-[#4A4A4A] text-center max-w-2xl mx-auto mt-12 md:mt-16">
          Teams spend more time fighting their tools than serving the people they
          set out to help.
        </p>
      </Container>
    </Section>
  );
}
