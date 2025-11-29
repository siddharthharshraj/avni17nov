/**
 * Written By & Tags Section
 * Matches the design in the screenshot (793×294)
 */

import Image from "next/image";

interface WrittenBySectionProps {
  author: string | { name: string; avatar?: string; image?: string; title?: string };
  authorTitle?: string;
  date?: string;
  tags?: string[];
}

export default function WrittenBySection({
  author,
  authorTitle,
  tags = [],
}: WrittenBySectionProps) {
  const isStringAuthor = typeof author === "string";
  const authorName = isStringAuthor ? author : author?.name || "Avni Team";

  const authorImage =
    !isStringAuthor ? author?.image || author?.avatar : undefined;

  const authorJobTitle =
    !isStringAuthor ? author?.title : undefined;

  // For string authors, use authorTitle prop or default to "Avni Team"
  // For object authors, prioritize author.title, then authorTitle prop, then default
  const finalTitle = isStringAuthor 
    ? (authorTitle || "Avni Team")
    : (authorJobTitle || authorTitle || "Avni Team");

  return (
    <div
      id="written-by-section"
      className="border border-[#E5E7EB] rounded-[12px] p-4 sm:p-6 md:p-8 lg:p-10 bg-white relative w-full max-w-[793px]"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start relative gap-6 lg:gap-0">

        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-start w-full lg:w-[296px]">
          <p
            className="font-anek font-bold text-sm sm:text-[16px] leading-[16px] uppercase mb-4 sm:mb-6"
            style={{ color: "rgba(0,0,0,0.7)" }}
          >
            WRITTEN BY
          </p>

          <div className="flex items-start gap-3 sm:gap-4">
            {/* Avatar */}
            {authorImage ? (
              <div
                className="rounded-full overflow-hidden flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[66px] lg:h-[66px]"
              >
                <Image
                  src={authorImage}
                  alt={authorName}
                  width={66}
                  height={66}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div
                className="rounded-full bg-[#419372] flex items-center justify-center flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[66px] lg:h-[66px]"
              >
                <span className="font-anek font-bold text-lg sm:text-xl md:text-2xl text-white">
                  {authorName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {/* Name + Title */}
            <div className="min-w-0 flex-1">
              <h3 className="font-anek font-semibold text-base sm:text-lg md:text-[20px] text-[#0b2540] mb-1 break-words">
                {authorName}
              </h3>
              <p className="font-noto text-sm sm:text-[15px] text-[#6B7280] leading-[18px] sm:leading-[20px] break-words">
                {finalTitle}
              </p>
            </div>
          </div>
        </div>

        {/* DIVIDER - Horizontal on mobile, Vertical on desktop */}
        {tags.length > 0 && (
          <>
            {/* Horizontal divider for mobile/tablet */}
            <div className="lg:hidden w-full h-[1px] bg-[#EBEBEB]" />
            
            {/* Vertical divider for desktop */}
            <div
              className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ 
                width: "1px", 
                height: "226px",
                backgroundColor: "#EBEBEB",
                zIndex: 1
              }}
            />
          </>
        )}

        {/* RIGHT COLUMN (TAGS) */}
        {tags.length > 0 && (
          <div className="flex flex-col justify-start w-full lg:w-[281px]">
            <p
              className="font-anek font-bold text-sm sm:text-[16px] leading-[16px] uppercase mb-4 sm:mb-6"
              style={{ color: "rgba(0,0,0,0.7)" }}
            >
              TAGS
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center justify-center text-[#FF8854] font-anek uppercase rounded-[4px] text-xs sm:text-[13px] font-extrabold px-3 py-1.5 sm:px-4 sm:py-2"
                  style={{
                    backgroundColor: "rgba(233, 234, 248, 0.6)",
                    letterSpacing: "0.5px",
                    lineHeight: "18px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
