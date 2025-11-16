import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function PricingHero() {
  return (
    <section className="bg-white pt-[108px] md:pt-[120px] lg:pt-[140px] pb-8 md:pb-12">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <p className="font-anek font-bold text-[16px] leading-[20px] text-[#FBA57F] uppercase mb-3 md:mb-4">
            CHOOSE WHAT FITS YOUR BUDGET
          </p>
          <h1 className="font-anek font-bold text-[36px] leading-[32px] text-[#0B2540] mb-4 md:mb-6">
            Transparent, Scalable, Affordable Pricing
          </h1>
          <p className="font-noto font-normal text-[24px] leading-[30px] text-[#000000] opacity-80">
            Built to support your growth while keeping budgets in check
          </p>
        </div>
      </Container>
    </section>
  );
}
