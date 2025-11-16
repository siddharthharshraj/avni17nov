'use client';

/**
 * Blog Share and CTA Component
 * Displays social share buttons and get started CTAs
 */

import Link from 'next/link';
import Image from 'next/image';

interface BlogShareCTAProps {
  title: string;
  slug: string;
  siteUrl?: string;
}

export default function BlogShareCTA({ 
  title, 
  slug, 
  siteUrl = 'https://avniproject.org' 
}: BlogShareCTAProps) {
  // Generate UTM-tagged share URLs
  const blogUrl = `${siteUrl}/blog/${slug}`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}?utm_source=facebook&utm_medium=share&utm_campaign=blogpost`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}?utm_source=linkedin&utm_medium=share&utm_campaign=blogpost`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}?utm_source=x&utm_medium=share&utm_campaign=blogpost&text=${encodeURIComponent(title)}`,
  };

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[20px] p-6" style={{ width: '310px', minHeight: '347px' }}>
      {/* SHARE POST */}
      <div className="mb-6">
        <p className="font-anek font-bold text-[16px] leading-[16px] tracking-[0px] uppercase mb-4" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
          SHARE POST
        </p>
        
        <div className="flex gap-3">
          {/* Facebook */}
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            aria-label="Share on Facebook"
          >
            <Image
              src="/icons/fbblog.svg"
              alt="Facebook"
              width={36}
              height={36}
            />
          </a>

          {/* LinkedIn */}
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            aria-label="Share on LinkedIn"
          >
            <Image
              src="/icons/linkedinblog.svg"
              alt="LinkedIn"
              width={36}
              height={36}
            />
          </a>

          {/* X (Twitter) */}
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            aria-label="Share on X"
          >
            <Image
              src="/icons/xblog.svg"
              alt="X (Twitter)"
              width={36}
              height={36}
            />
          </a>
        </div>
      </div>

      {/* GET STARTED */}
      <div className="pt-6 border-t border-[#EBEBEB]">
        <p className="font-anek font-bold text-[16px] leading-[16px] tracking-[0px] uppercase mb-4" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
          GET STARTED
        </p>

        <div className="flex flex-col items-start gap-3">
          {/* Sign Up Button - Compact design */}
          <Link
            href="/get-started"
            className="bg-[#419372] text-white font-anek font-semibold text-center rounded-full hover:bg-[#357a5e] transition-colors px-8 py-3"
          >
            Sign Up for Free
          </Link>

          {/* Contact Button - Compact design */}
          <Link
            href="/contact"
            className="text-[#419372] font-anek font-semibold text-center rounded-full hover:bg-[#419372] hover:text-white transition-colors border-2 border-[#419372] px-8 py-3"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
