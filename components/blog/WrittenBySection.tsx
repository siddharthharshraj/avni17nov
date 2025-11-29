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
      className="border border-[#E5E7EB] rounded-[12px] p-10 bg-white relative"
      style={{ width: "793px", minHeight: "294px" }}
    >
      <div className="flex justify-between items-start relative" style={{ minHeight: "200px" }}>

        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-start" style={{ width: "296px" }}>
          <p
            className="font-anek font-bold text-[16px] leading-[16px] uppercase mb-6"
            style={{ color: "rgba(0,0,0,0.7)" }}
          >
            WRITTEN BY
          </p>

          <div className="flex items-start gap-4">
            {/* Avatar */}
            {authorImage ? (
              <div
                className="rounded-full overflow-hidden"
                style={{ width: "66px", height: "66px" }}
              >
                <Image
                  src={authorImage}
                  alt={authorName}
                  width={66}
                  height={66}
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="rounded-full bg-[#419372] flex items-center justify-center"
                style={{ width: "66px", height: "66px" }}
              >
                <span className="font-anek font-bold text-2xl text-white">
                  {authorName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {/* Name + Title */}
            <div>
              <h3 className="font-anek font-semibold text-[20px] text-[#0b2540] mb-1">
                {authorName}
              </h3>
              <p className="font-noto text-[15px] text-[#6B7280] leading-[20px]">
                {finalTitle}
              </p>
            </div>
          </div>
        </div>

        {/* VERTICAL DIVIDER */}
        {tags.length > 0 && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ 
              width: "1px", 
              height: "226px",
              backgroundColor: "#EBEBEB",
              zIndex: 1
            }}
          />
        )}

        {/* RIGHT COLUMN (TAGS) */}
        {tags.length > 0 && (
          <div className="flex flex-col justify-start" style={{ width: "281px" }}>
            <p
              className="font-anek font-bold text-[16px] leading-[16px] uppercase mb-6"
              style={{ color: "rgba(0,0,0,0.7)" }}
            >
              TAGS
            </p>

            <div className="flex flex-wrap gap-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center justify-center text-[#FF8854] font-anek uppercase rounded-[4px]"
                  style={{
                    backgroundColor: "rgba(233, 234, 248, 0.6)",
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: 800,
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
