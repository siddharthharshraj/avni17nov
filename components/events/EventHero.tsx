/**
 * Event Hero Component
 * Hero section for Events page with tagline, title, and description
 */

export default function EventHero() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Tagline */}
          <p className="font-anek font-bold text-[16px] leading-[20px] text-[#fba57f] uppercase mb-3">
            CONNECT. LEARN. GROW.
          </p>

          {/* Title */}
          <h1 className="font-anek font-bold text-[36px] leading-[32px] text-[#0b2540] mb-4">
            Avni Events
          </h1>

          {/* Description */}
          <p className="font-noto font-normal text-[24px] leading-[30px] text-[#000000] text-center">
            Join our upcoming online and in-person events to explore product updates, learn from expert sessions, and engage with the Avni community driving digital transformation across sectors.
          </p>
        </div>
      </div>
    </section>
  );
}
