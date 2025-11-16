import Container from "@/components/ui/Container";

export default function DemoHero() {
  return (
    <section className="bg-white pt-[108px] md:pt-[120px] lg:pt-[140px] pb-12 md:pb-16">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <p className="font-anek font-bold text-[16px] leading-[20px] text-[#FBA57F] uppercase mb-4">
            TEST. LEARN. ADAPT.
          </p>
          <h1 className="font-anek font-bold text-[36px] leading-[32px] text-[#0B2540] mb-6">
            Experience Avni In Action In 3 Easy Steps
          </h1>
          <p className="font-noto font-normal text-[24px] leading-[30px] text-[#000000] opacity-80">
            Try our functional demos to see how Avni can transform your field operations
          </p>
        </div>
      </Container>
    </section>
  );
}
