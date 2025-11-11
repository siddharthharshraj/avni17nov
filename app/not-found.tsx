'use client';

/**
 * 404 Not Found Page
 * Redirects to homepage after 5 seconds
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Separate effect for navigation
  useEffect(() => {
    if (countdown === 0) {
      router.push('/');
    }
  }, [countdown, router]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-[72px] flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Large Text */}
          <h1 className="font-anek font-bold text-[120px] md:text-[180px] leading-none text-[#FFD84D] mb-4">
            404
          </h1>

          {/* Error Message */}
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl text-[#0b2540] mb-4">
            Page Not Found
          </h2>

          <p className="font-noto text-base md:text-lg text-[#5a6c7d] mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>

          {/* Countdown */}
          <p className="font-noto text-sm text-[#999999] mb-8">
            Redirecting to homepage in{' '}
            <span className="font-bold text-[#419372]">{countdown}</span>{' '}
            {countdown === 1 ? 'second' : 'seconds'}...
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#419372] text-white font-anek font-medium text-base rounded-full hover:bg-[#357a5e] transition-all"
            >
              Go to Homepage
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#419372] font-anek font-medium text-base rounded-full border-2 border-[#419372] hover:bg-[#419372] hover:text-white transition-all"
            >
              Explore Solutions
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="font-noto text-sm text-[#5a6c7d] mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/about"
                className="font-noto text-sm text-[#419372] hover:underline"
              >
                About Us
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/services"
                className="font-noto text-sm text-[#419372] hover:underline"
              >
                Services
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/use-cases"
                className="font-noto text-sm text-[#419372] hover:underline"
              >
                Use Cases
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
