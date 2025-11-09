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

        {/* Testimonials - Mobile: Horizontal Scroll, Desktop: Carousel */}
        <div className="lg:hidden">
          {/* Mobile: Horizontal Scrollable */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[85vw] sm:w-[70vw] snap-center"
              >
                <div className="bg-white rounded-2xl p-6 h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 28C12 24.686 14.686 22 18 22V18C12.477 18 8 22.477 8 28V36H20V28H12ZM32 28C32 24.686 34.686 22 38 22V18C32.477 18 28 22.477 28 28V36H40V28H32Z"
                        fill="#FBA47E"
                      />
                    </svg>
                  </div>

                  {/* Quote Text */}
                  <p className="font-noto text-sm leading-relaxed text-[#000000] italic mb-4 flex-grow">
                    "{testimonial.quote}"
                  </p>

                  {/* Impact Stat */}
                  {testimonial.stat && (
                    <div className="mb-4">
                      <p className="font-anek font-bold text-sm leading-tight text-[#419372]">
                        {testimonial.stat}
                      </p>
                    </div>
                  )}

                  {/* Video Thumbnail */}
                  {testimonial.type === "video" && testimonial.videoThumbnail && (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 group cursor-pointer">
                      <Image
                        src={testimonial.videoThumbnail}
                        alt={`${testimonial.name} video testimonial`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-[#419372] fill-[#419372] ml-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mt-auto">
                    {testimonial.image && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-anek font-bold text-sm leading-tight text-[#0b2540]">
                        {testimonial.name}
                      </p>
                      {testimonial.position && (
                        <p className="font-noto text-xs leading-tight text-[#000000] opacity-70">
                          {testimonial.position}
                        </p>
                      )}
                      <p className="font-anek text-xs leading-tight text-[#419372]">
                        {testimonial.organization}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Carousel */}
        <div className="hidden lg:block">
          <Carousel itemsPerView={3} gap={24}>
            {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 md:p-8 h-full flex flex-col"
            >
              {/* Quote Icon */}
              <div className="mb-4 md:mb-6">
                <svg
                  width="40"
                  height="40"
                  className="md:w-12 md:h-12"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 28C12 24.686 14.686 22 18 22V18C12.477 18 8 22.477 8 28V36H20V28H12ZM32 28C32 24.686 34.686 22 38 22V18C32.477 18 28 22.477 28 28V36H40V28H32Z"
                    fill="#FBA47E"
                  />
                </svg>
              </div>

              {/* Quote Text */}
              <p className="font-noto text-sm md:text-base leading-relaxed text-[#000000] italic mb-4 md:mb-6 flex-grow">
                "{testimonial.quote}"
              </p>

              {/* Impact Stat */}
              {testimonial.stat && (
                <div className="mb-4 md:mb-6">
                  <p className="font-anek font-bold text-sm md:text-base leading-tight text-[#419372]">
                    {testimonial.stat}
                  </p>
                </div>
              )}

              {/* Video Thumbnail or Spacer */}
              {testimonial.type === "video" && testimonial.videoThumbnail && (
                <div className="relative w-full h-40 md:h-44 lg:h-[180px] rounded-xl overflow-hidden mb-4 md:mb-6 group cursor-pointer">
                  <Image
                    src={testimonial.videoThumbnail}
                    alt={`${testimonial.name} video testimonial`}
                    fill
                    className="object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-[#419372] fill-[#419372] ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="flex items-center gap-3 mt-auto">
                {/* Avatar - Smaller circular image */}
                {testimonial.image && (
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Name and Organization */}
                <div>
                  <p className="font-anek font-bold text-sm md:text-base leading-tight text-[#0b2540]">
                    {testimonial.name}
                  </p>
                  {testimonial.position && (
                    <p className="font-noto text-xs md:text-sm leading-tight text-[#000000] opacity-70">
                      {testimonial.position}
                    </p>
                  )}
                  <p className="font-anek text-xs md:text-sm leading-tight text-[#419372]">
                    {testimonial.organization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        </div>
      </Container>
    </Section>
  );
}
