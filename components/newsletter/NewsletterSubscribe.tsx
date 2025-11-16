'use client';

/**
 * Newsletter Subscription Component
 * Integrates with Mailchimp for email subscriptions
 * Features: Email validation, loading states, success/error feedback
 */

import { useState, FormEvent } from 'react';

interface NewsletterSubscribeProps {
  variant?: 'default' | 'inline' | 'card';
  showName?: boolean;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export default function NewsletterSubscribe({
  variant = 'default',
  showName = false,
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  className = '',
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset status
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName: showName ? firstName : undefined,
          lastName: showName ? lastName : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok || data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed! Please check your email.');
        setEmail('');
        setFirstName('');
        setLastName('');
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        
        // Reset error message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  // Inline variant (horizontal layout)
  if (variant === 'inline') {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 rounded-full border-2 border-[#E5E7EB] focus:border-[#419372] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-noto text-[15px]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-[#419372] text-white font-anek font-semibold rounded-full hover:bg-[#357a5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : buttonText}
          </button>
        </form>
        
        {/* Status Messages */}
        {message && (
          <div className={`mt-3 p-3 rounded-lg text-sm font-noto ${
            status === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {status === 'success' && (
              <span className="inline-block mr-2">🎉</span>
            )}
            {message}
          </div>
        )}
      </div>
    );
  }

  // Card variant (with background and padding)
  if (variant === 'card') {
    return (
      <div className={`bg-gradient-to-br from-[#419372]/10 to-[#419372]/5 rounded-[20px] p-8 ${className}`}>
        <div className="text-center mb-6">
          <h3 className="font-anek font-bold text-[24px] text-[#0b2540] mb-2">
            Stay Updated
          </h3>
          <p className="font-noto text-[15px] text-[#6B7280]">
            Get the latest insights and updates from Avni
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {showName && (
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="px-4 py-3 rounded-lg border-2 border-[#E5E7EB] focus:border-[#419372] focus:outline-none font-noto text-[15px]"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="px-4 py-3 rounded-lg border-2 border-[#E5E7EB] focus:border-[#419372] focus:outline-none font-noto text-[15px]"
              />
            </div>
          )}
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#E5E7EB] focus:border-[#419372] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-noto text-[15px]"
          />
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-[#419372] text-white font-anek font-semibold rounded-lg hover:bg-[#357a5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : buttonText}
          </button>
        </form>

        {/* Status Messages */}
        {message && (
          <div className={`mt-4 p-4 rounded-lg text-sm font-noto ${
            status === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {status === 'success' && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <span className="font-semibold">{message}</span>
              </div>
            )}
            {status === 'error' && message}
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {showName && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="px-4 py-3 rounded-full border-2 border-[#E5E7EB] focus:border-[#419372] focus:outline-none font-noto text-[15px]"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="px-4 py-3 rounded-full border-2 border-[#E5E7EB] focus:border-[#419372] focus:outline-none font-noto text-[15px]"
            />
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 rounded-full border-2 border-[#E5E7EB] focus:border-[#419372] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-noto text-[15px]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3 bg-[#419372] text-white font-anek font-semibold rounded-full hover:bg-[#357a5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : buttonText}
          </button>
        </div>
      </form>

      {/* Status Messages */}
      {message && (
        <div className={`mt-4 p-4 rounded-lg text-sm font-noto animate-fadeIn ${
          status === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {status === 'success' && (
            <div className="flex items-center gap-2">
              <span className="text-xl">🎉</span>
              <div>
                <p className="font-semibold">Congratulations!</p>
                <p>{message}</p>
              </div>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <p>{message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
