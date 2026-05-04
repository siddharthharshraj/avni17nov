import Link from "next/link";
import Container from "@/components/ui/Container";

export default function FinalCTA() {
  return (
    <section className="bg-[#0e3b2e] text-white py-20 md:py-24 lg:py-28 2xl:py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
            Let your data support your mission — not slow it down.
          </h2>
          <p className="font-noto text-lg md:text-xl text-white/80 mb-10">
            Start your free trial, or talk to us about your programme. No credit
            card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/avni-marketing-samanvayfoundation/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#FFD84D] text-[#0b2540] rounded-full font-anek font-semibold text-base hover:bg-white transition-colors"
            >
              Book a demo
            </a>
            <Link
              href="/use-cases"
              className="px-8 py-3.5 border-2 border-white/40 text-white rounded-full font-anek font-semibold text-base hover:bg-white hover:text-[#0b2540] transition-colors"
            >
              Explore use cases
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
