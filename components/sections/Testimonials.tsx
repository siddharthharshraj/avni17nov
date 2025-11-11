/**
 * Testimonials Section - What Our Users Say
 * Exact Figma design with carousel functionality
 */

"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Carousel } from "@/components/ui";
import { testimonials } from "@/data";

export default function Testimonials() {
  return (
    <Section spacing="lg" className="bg-[#F5F5F5]">
      <Container>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-[60px]">
          <p className="font-anek font-medium text-xs md:text-sm leading-tight text-[#fba47e] uppercase mb-3 md:mb-4">
            TESTIMONIALS
          </p>
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
            What Our Users Say?
          </h2>
        </div>

        {/* Testimonials - Mobile: Horizontal Scroll, Desktop: Grid */}
        <div className="lg:hidden">
          {/* Mobile: Horizontal Scrollable */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[85vw] sm:w-[70vw] snap-center"
              >
                <div className="bg-white rounded-[20px] p-8 h-full flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow min-h-[400px]">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 28C12 24.686 14.686 22 18 22V18C12.477 18 8 22.477 8 28V36H20V28H12ZM32 28C32 24.686 34.686 22 38 22V18C32.477 18 28 22.477 28 28V36H40V28H32Z"
                        fill="#FFD84D"
                      />
                    </svg>
                  </div>

                  {/* Quote Text */}
                  <p className="font-noto text-base leading-relaxed text-[#000000]/80 mb-6 flex-grow">
                    {testimonial.quote}
                  </p>

                  {/* Video Thumbnail */}
                  {testimonial.type === "video" && testimonial.videoThumbnail && (
                    <div className="relative w-full h-48 rounded-[16px] overflow-hidden mb-6 group cursor-pointer">
                      <Image
                        src={testimonial.videoThumbnail}
                        alt={`${testimonial.name} video testimonial`}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 85vw, 300px"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-all">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <Play className="w-7 h-7 text-[#419372] fill-[#419372] ml-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Author Info */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                    {testimonial.image && (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 ring-2 ring-gray-100">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="56px"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-anek font-bold text-base leading-tight text-[#0b2540] mb-1">
                        {testimonial.name}
                      </p>
                      <p className="font-noto text-sm leading-tight text-[#000000]/60">
                        {testimonial.organization}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-[20px] p-8 xl:p-10 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow min-h-[480px]"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 28C12 24.686 14.686 22 18 22V18C12.477 18 8 22.477 8 28V36H20V28H12ZM32 28C32 24.686 34.686 22 38 22V18C32.477 18 28 22.477 28 28V36H40V28H32Z"
                    fill="#FFD84D"
                  />
                </svg>
              </div>

              {/* Quote Text */}
              <p className="font-noto text-base xl:text-lg leading-relaxed text-[#000000]/80 mb-8 flex-grow">
                {testimonial.quote}
              </p>

              {/* Video Thumbnail */}
              {testimonial.type === "video" && testimonial.videoThumbnail && (
                <div className="relative w-full h-52 xl:h-60 rounded-[16px] overflow-hidden mb-8 group cursor-pointer">
                  <Image
                    src={testimonial.videoThumbnail}
                    alt={`${testimonial.name} video testimonial`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1280px) 33vw, 400px"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-all">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-9 h-9 text-[#419372] fill-[#419372] ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                {/* Avatar */}
                {testimonial.image && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 ring-2 ring-gray-100">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="64px"
                    />
                  </div>
                )}

                {/* Name and Organization */}
                <div>
                  <p className="font-anek font-bold text-lg leading-tight text-[#0b2540] mb-1">
                    {testimonial.name}
                  </p>
                  <p className="font-noto text-sm leading-tight text-[#000000]/60">
                    {testimonial.organization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
