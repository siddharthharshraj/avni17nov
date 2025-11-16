/**
 * Contact Hero Component
 * Hero section for Contact Us page
 */

export default function ContactHero() {
  return (
    <section className="w-full bg-white pt-24 md:pt-32 pb-12 md:pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        {/* Tagline */}
        <p className="font-anek font-medium text-[12px] md:text-[14px] leading-[18px] md:leading-[20px] text-[#ff8854] uppercase tracking-wider mb-4">
          Have a question or need assistance?
        </p>

        {/* Title */}
        <h1 className="font-anek font-bold text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] text-[#0b2540] mb-4 md:mb-6">
          Contact Us
        </h1>

        {/* Description */}
        <p className="font-noto font-normal text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-[#000000]/80 max-w-[600px] mx-auto px-4">
          Reach out for product questions, support, partnerships, or anything you need to move your field operations forward
        </p>
      </div>
    </section>
  );
}
