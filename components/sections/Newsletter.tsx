'use client';

import { useState, FormEvent } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok || data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed! Please check your email.');
        setEmail('');
        
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-24 bg-[#E9EAF84D]">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-[56px] leading-tight text-[#0b2540] mb-4 md:mb-6">
            Stay Connected With Avni
          </h2>
          <p className="font-noto text-base md:text-lg lg:text-xl leading-relaxed text-[#4A4A4A] mb-6 md:mb-8">
            Get the latest updates, releases, and event news in your inbox.
            <br className="hidden sm:block" />{' '}
            Join to engage with the growing Avni community.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="flex-1 h-14 md:h-16 px-6 md:px-8 rounded-full border border-[#E0E0E0] bg-white font-noto text-base md:text-lg text-[#000000] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#419372] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="h-14 md:h-16 px-8 md:px-10 bg-[#419372] text-white rounded-full font-anek font-semibold text-base md:text-lg hover:bg-[#357a5e] transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {/* Status Messages */}
          {message && (
            <div className={`mt-6 p-4 rounded-lg text-sm md:text-base font-noto max-w-xl mx-auto animate-fadeIn ${
              status === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {status === 'success' && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">🎉</span>
                  <div className="text-center">
                    <p className="font-semibold">Congratulations!</p>
                    <p>{message}</p>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">⚠️</span>
                  <p>{message}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
