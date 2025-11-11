'use client';

/**
 * Copy Email Button Component
 * Button to copy email address to clipboard with visual feedback
 */

import { useState } from 'react';

interface CopyEmailButtonProps {
  email: string;
}

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#419372]/10 hover:bg-[#419372]/20 transition-all"
      title="Copy email to clipboard"
    >
      {copied ? (
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#419372]"
        >
          <path 
            d="M20 6L9 17L4 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#419372]"
        >
          <path 
            d="M8 4V16C8 17.1046 8.89543 18 10 18H18M8 4C8 2.89543 8.89543 2 10 2H15.1716C15.702 2 16.2107 2.21071 16.5858 2.58579L19.4142 5.41421C19.7893 5.78929 20 6.29799 20 6.82843V14C20 15.1046 19.1046 16 18 16M8 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H14C15.1046 22 16 21.1046 16 20V18" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}
      
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#0b2540] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {copied ? 'Copied!' : 'Copy email'}
      </span>
    </button>
  );
}
