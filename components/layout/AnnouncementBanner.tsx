"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AnnouncementBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: November 21, 2025, 23:59 IST (UTC+5:30)
      const targetDate = new Date('2025-11-21T23:59:00+05:30');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div 
      className="fixed top-[72px] left-0 right-0 min-h-[36px] h-auto z-40 shadow-md py-1"
      style={{
        background: 'linear-gradient(90deg, rgba(251, 164, 126, 0.85) 0%, rgba(255, 119, 81, 0.85) 33.17%, rgba(243, 202, 64, 0.85) 100%)'
      }}
    >
      <div className="max-w-7xl w-full mx-auto h-full flex flex-row items-center justify-between px-2 sm:px-4 lg:px-8 2xl:px-12 gap-1 sm:gap-3">
        {/* Text */}
        <p className="font-anek font-bold text-[9px] sm:text-[11px] lg:text-[14px] leading-tight text-[#000000] uppercase tracking-wide flex-shrink min-w-0">
          ⚡ <span className="hidden md:inline">Sign up for avni launchpad event - december 2025, free! 🔥</span>
          <span className="md:hidden">Launchpad Dec 2025</span> Last Chance!
        </p>
        {/* Right section */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-[10px] flex-shrink-0">
          {/* Timer box */}
          <div className="px-1.5 sm:px-2 lg:px-[12px] py-0.5 sm:py-1 rounded-[6px] flex items-center justify-center bg-white shadow-sm">
            <span className="font-mono text-[9px] sm:text-[10px] lg:text-[13px] leading-tight text-[#000000] font-bold whitespace-nowrap">
              {formatNumber(timeLeft.days)} : {formatNumber(timeLeft.hours)} : {formatNumber(timeLeft.minutes)} : {formatNumber(timeLeft.seconds)}
            </span>
          </div>
          {/* Apply button */}
          <Link
            href="/apply"
            className="bg-[#419372] text-white rounded-[6px] font-anek font-extrabold text-[9px] sm:text-[10px] lg:text-[11px] leading-tight hover:bg-[#357a5e] hover:scale-105 transition-all shadow-md uppercase tracking-wide px-2 sm:px-3 py-1 sm:py-1.5 whitespace-nowrap"
          >
            Apply!
          </Link>
        </div>
      </div>
    </div>
  );
}
