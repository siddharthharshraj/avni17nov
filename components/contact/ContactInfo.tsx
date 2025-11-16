/**
 * Contact Info Component
 * Display contact information
 */

'use client';

import { useState } from 'react';
import { Mail, MapPin, Copy, Check } from 'lucide-react';

export default function ContactInfo() {
  const [copied, setCopied] = useState(false);
  const email = 'avnipartnerships@samanvayafoundation.org';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full lg:w-[310px] min-h-[431px] border border-[#EBEBEB] rounded-[20px] p-6 md:p-8">
        <h3 className="font-anek font-bold text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#000000] uppercase mb-4 md:mb-6">
          Reach out at
        </h3>

        {/* Email */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#ff8854]" />
            <p className="font-anek font-bold text-[12px] md:text-[14px] leading-[12px] md:leading-[14px] text-[#000000] uppercase">
              Email
            </p>
          </div>
          <div className="flex items-start gap-2">
            <a
              href={`mailto:${email}`}
              className="font-noto font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#000000] hover:text-[#419372] transition-colors break-all flex-1 overflow-hidden"
            >
              {email}
            </a>
            <button
              onClick={handleCopyEmail}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy email"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-[#ff8854]" />
              )}
            </button>
          </div>
        </div>

        {/* Office Address */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#ff8854]" />
            <p className="font-anek font-bold text-[12px] md:text-[14px] leading-[12px] md:leading-[14px] text-[#000000] uppercase">
              Office Address
            </p>
          </div>
          <address className="font-noto font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#000000] not-italic">
            Samanvay Foundation<br />
            147, 1st Floor, 10th Cross Rd, Binnamangala,<br />
            Hoysala Nagar, Indiranagar,<br />
            Bengaluru, Karnataka<br />
            560038
          </address>
        </div>
      </div>
    </div>
  );
}
