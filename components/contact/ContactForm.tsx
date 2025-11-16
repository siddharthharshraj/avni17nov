/**
 * Contact Form Component
 * Form for submitting contact inquiries
 */

'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="border border-[#EBEBEB] rounded-[20px] p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block font-noto font-medium text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#000000] mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your Full Name"
            className="w-full h-[60px] md:h-[80px] px-4 py-3 border border-[#EBEBEB] rounded-[20px] font-noto text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#000000] placeholder:text-[#000000]/40 focus:outline-none focus:ring-2 focus:ring-[#419372] focus:border-transparent"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block font-noto font-medium text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#000000] mb-2">
            Email Id
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Your Organisational Email Id"
            className="w-full h-[60px] md:h-[80px] px-4 py-3 border border-[#EBEBEB] rounded-[20px] font-noto text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#000000] placeholder:text-[#000000]/40 focus:outline-none focus:ring-2 focus:ring-[#419372] focus:border-transparent"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block font-noto font-medium text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#000000] mb-2">
            Message
          </label>
          <textarea
            id="message"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Your message..."
            className="w-full h-[180px] md:h-[250px] px-4 py-3 border border-[#EBEBEB] rounded-[20px] font-noto text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#000000] placeholder:text-[#000000]/40 focus:outline-none focus:ring-2 focus:ring-[#419372] focus:border-transparent resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 bg-[#419372] text-white font-anek font-medium text-[14px] md:text-[16px] leading-[14px] md:leading-[16px] rounded-full hover:bg-[#357a5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Submit Form'}
        </button>
      </form>

      {/* Status Messages - Outside form for better visibility */}
      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="font-noto text-[14px] md:text-[16px] text-green-700">
            ✓ Message sent successfully! We'll get back to you soon.
          </p>
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="font-noto text-[14px] md:text-[16px] text-red-700">
            ✗ {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
}
