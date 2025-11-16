import Link from "next/link";

export default function PricingFAQ() {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-24 bg-[#E9EAF84D]">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="font-anek font-bold text-xl md:text-2xl lg:text-[32px] leading-tight md:leading-[32px] text-[#0B2540] mb-4 md:mb-6">
            Still Have Doubts Or Questions?
          </h2>
          <p className="font-noto font-medium text-base md:text-lg lg:text-xl xl:text-[24px] leading-relaxed md:leading-[30px] text-[#000000] opacity-80 mb-6 md:mb-8">
            Reach Out To Our Support Team To Connect With You And Answer Your Queries And Concerns
          </p>
          <Link
            href="mailto:avnipartnerships@samanvayfoundation.org?subject=Avni%20Support%20Query"
            className="inline-flex items-center justify-center h-14 md:h-16 px-8 md:px-10 bg-[#419372] text-[#F6F9FC] rounded-full font-anek font-medium text-[20px] leading-[20px] hover:bg-[#357a5e] transition-all whitespace-nowrap"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
