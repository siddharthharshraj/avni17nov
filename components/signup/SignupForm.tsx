'use client';

/**
 * Signup Form Component
 * n8n-powered form with validation, reCAPTCHA, and success state
 */

import { useState, useRef, FormEvent } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-phone-number-input/style.css';

// Dynamically import ReCAPTCHA to avoid SSR issues
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });

// Dynamically import PhoneInput to avoid SSR issues
const PhoneInput = dynamic(() => import('react-phone-number-input').then(mod => mod.default), { ssr: false });

interface ValidationErrors {
  [key: string]: string[];
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organisationName: string;
  sector: string;
  otherSector?: string;
  sourceOfSignup?: string;
}

export default function SignupForm() {
  const [status, setStatus] = useState<'initial' | 'success' | 'error'>('initial');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organisationName: '',
    sector: '',
  });
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('IN');
  const [showOtherSector, setShowOtherSector] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  
  const recaptchaRef = useRef<any>(null);

  // Email validation
  const validateEmail = (email: string) => {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
      return { isValid: false, errors };
    }

    const disposableDomains = ['mailinator.com', '10minutemail.com', 'guerrillamail.com', 'tempmail.org'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (disposableDomains.includes(domain)) {
      errors.push('Disposable email addresses are not allowed');
    }

    const roleBasedEmails = ['admin@', 'info@', 'support@', 'noreply@', 'contact@'];
    if (roleBasedEmails.some(role => email.toLowerCase().startsWith(role))) {
      errors.push('Role-based email addresses are not allowed');
    }

    return { isValid: errors.length === 0, errors };
  };

  // Name validation
  const validateName = (name: string, fieldName: string) => {
    const errors: string[] = [];
    
    if (!name || name.trim().length === 0) {
      errors.push(`${fieldName} is required`);
      return { isValid: false, errors };
    }

    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(name.trim())) {
      errors.push(`${fieldName} can only contain letters, spaces, hyphens, and apostrophes`);
    }

    if (name.trim().length < 2) {
      errors.push(`${fieldName} must be at least 2 characters long`);
    }

    return { isValid: errors.length === 0, errors };
  };

  // Form validation
  const validateForm = () => {
    const errors: ValidationErrors = {};

    // Validate first name
    const firstNameValidation = validateName(formData.firstName, 'First Name');
    if (!firstNameValidation.isValid) {
      errors.firstName = firstNameValidation.errors;
    }

    // Validate last name
    const lastNameValidation = validateName(formData.lastName, 'Last Name');
    if (!lastNameValidation.isValid) {
      errors.lastName = lastNameValidation.errors;
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.errors;
    }

    // Validate phone
    if (!phone || phone.length < 10) {
      errors.phone = ['Please enter a valid phone number'];
    }

    // Validate organization name
    if (!formData.organisationName || formData.organisationName.trim().length < 2) {
      errors.organisationName = ['Organisation name must be at least 2 characters long'];
    }

    // Validate sector
    if (!formData.sector) {
      errors.sector = ['Please select a sector'];
    }

    // Validate terms
    if (!termsAccepted) {
      errors.terms = ['You must accept the Terms and Conditions and Privacy Policy'];
    }

    // Validate reCAPTCHA
    if (!recaptchaValue) {
      errors.recaptcha = ['Please complete the reCAPTCHA verification'];
    }

    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate form
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setValidationErrors({});

    // Prepare webhook data
    const webhookData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: phone || '',
      country: country,
      organisationName: formData.organisationName,
      organisationType: 'NGO',
      sector: formData.sector,
      otherSector: formData.otherSector || '',
      sourceOfSignup: formData.sourceOfSignup || '',
      marketingConsent: marketingConsent,
      recaptcha: recaptchaValue,
      source: 'trial'
    };

    try {
      const response = await fetch('https://avniproject.app.n8n.cloud/webhook/avni-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        setStatus('success');
        // Set cookie to prevent duplicate submissions
        document.cookie = `avni_signup_${formData.email}=true; max-age=86400; path=/`;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Success state
  if (status === 'success') {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-72px)] px-6 py-12">
        <div className="bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-8 md:p-12 max-w-2xl w-full text-center relative">
          <Link
            href="/"
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <div className="w-24 h-24 bg-[#419372] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-4">
            Welcome aboard, {formData.firstName}!
          </h2>

          <p className="font-noto text-base md:text-lg text-[#5a6c7d] mb-8 leading-relaxed">
            We've sent your login details to <strong className="text-[#419372]">{formData.email}</strong>.
            <br />
            Log in and begin creating impact with your team.
          </p>

          <a
            href="https://app.avniproject.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#419372] text-white font-anek font-semibold text-base rounded-full hover:bg-[#357a5e] transition-all shadow-lg hover:shadow-xl"
          >
            Get Started
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)] px-6 py-12">
      <div className="bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-8 md:p-12 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-3">
            Start Your 30-Day Free Trial
          </h1>
          <p className="font-noto text-base text-[#5a6c7d] leading-relaxed">
            Grow with Avni as a digital partner, helping organizations everywhere enhance their solutions and reach.
          </p>
        </div>

        {/* Error Message */}
        {status === 'error' && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600 font-medium text-sm">
              Oops! There was an error. Please try again.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl font-noto text-sm transition-colors focus:outline-none focus:border-[#419372] ${
                  validationErrors.firstName ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="First name"
                required
              />
              {validationErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.firstName.join(', ')}</p>
              )}
            </div>

            <div>
              <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl font-noto text-sm transition-colors focus:outline-none focus:border-[#419372] ${
                  validationErrors.lastName ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Last name"
                required
              />
              {validationErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.lastName.join(', ')}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
              Professional Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl font-noto text-sm transition-colors focus:outline-none focus:border-[#419372] ${
                validationErrors.email ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter your email"
              required
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.email.join(', ')}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
              Phone Number *
            </label>
            <div className={`border-2 rounded-xl overflow-hidden ${validationErrors.phone ? 'border-red-300' : 'border-gray-200'}`}>
              <PhoneInput
                international
                defaultCountry="IN"
                value={phone}
                onChange={(value: string | undefined) => {
                  setPhone(value || '');
                  setValidationErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.phone;
                    return newErrors;
                  });
                }}
                className="phone-input-custom"
              />
            </div>
            {validationErrors.phone && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.phone.join(', ')}</p>
            )}
          </div>

          {/* Organisation Name */}
          <div>
            <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
              Organisation Name *
            </label>
            <input
              type="text"
              value={formData.organisationName}
              onChange={(e) => handleInputChange('organisationName', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl font-noto text-sm transition-colors focus:outline-none focus:border-[#419372] ${
                validationErrors.organisationName ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Enter your organisation name"
              required
            />
            {validationErrors.organisationName && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.organisationName.join(', ')}</p>
            )}
          </div>

          {/* Sector */}
          <div>
            <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
              Sector *
            </label>
            <select
              value={formData.sector}
              onChange={(e) => {
                handleInputChange('sector', e.target.value);
                setShowOtherSector(e.target.value === 'Other');
              }}
              className={`w-full px-4 py-3 border-2 rounded-xl font-noto text-sm transition-colors focus:outline-none focus:border-[#419372] ${
                validationErrors.sector ? 'border-red-300' : 'border-gray-200'
              }`}
              required
            >
              <option value="">Select Sector</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Education & Training">Education & Training</option>
              <option value="Environment & Sustainability">Environment & Sustainability</option>
              <option value="Social Justice & Human Rights">Social Justice & Human Rights</option>
              <option value="Economic Development & Livelihood">Economic Development & Livelihood</option>
              <option value="Technology & Innovation">Technology & Innovation</option>
              <option value="Community Development">Community Development</option>
              <option value="Emergency Response & Relief">Emergency Response & Relief</option>
              <option value="Other">Other</option>
            </select>
            {validationErrors.sector && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.sector.join(', ')}</p>
            )}
          </div>

          {/* Other Sector */}
          {showOtherSector && (
            <div>
              <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
                Please describe other sector
              </label>
              <input
                type="text"
                value={formData.otherSector || ''}
                onChange={(e) => handleInputChange('otherSector', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-noto text-sm transition-colors focus:outline-none focus:border-[#419372]"
                placeholder="Please describe your sector"
              />
            </div>
          )}

          {/* Source of Signup */}
          <div>
            <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
              How did you hear about us?
            </label>
            <select
              value={formData.sourceOfSignup || ''}
              onChange={(e) => handleInputChange('sourceOfSignup', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-noto text-sm transition-colors focus:outline-none focus:border-[#419372]"
            >
              <option value="">Select source</option>
              <option value="Social Media">Social Media</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Search Engine">Search Engine</option>
              <option value="Event/Conference">Event/Conference</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* reCAPTCHA */}
          <div>
            <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
              Security Verification *
            </label>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LfOPawrAAAAAC_5xEjRNFx3RHAw6MY5y3Q2CKc8"
              onChange={(value: string | null) => {
                setRecaptchaValue(value);
                setValidationErrors(prev => {
                  const newErrors = { ...prev };
                  delete newErrors.recaptcha;
                  return newErrors;
                });
              }}
              onExpired={() => setRecaptchaValue(null)}
            />
            {validationErrors.recaptcha && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.recaptcha.join(', ')}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  setValidationErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.terms;
                    return newErrors;
                  });
                }}
                className="mt-1 w-4 h-4 text-[#419372] border-gray-300 rounded focus:ring-[#419372]"
                required
              />
              <span className="font-noto text-sm text-[#5a6c7d] leading-relaxed">
                I agree with the{' '}
                <Link href="/privacy-policy" target="_blank" className="text-[#419372] hover:underline font-medium">
                  Avni Privacy Policy
                </Link>{' '}
                and understand that my organization will process the data I collect in accordance with applicable data protection laws *
              </span>
            </label>
            {validationErrors.terms && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.terms.join(', ')}</p>
            )}
          </div>

          {/* Marketing Consent */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#419372] border-gray-300 rounded focus:ring-[#419372]"
              />
              <span className="font-noto text-sm text-[#5a6c7d] leading-relaxed">
                I would like to receive updates about Avni features and community news. I can unsubscribe at any time by clicking the link in any communication received.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 bg-[#419372] text-white font-anek font-semibold text-base rounded-full transition-all shadow-lg hover:shadow-xl ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#357a5e]'
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Start Free Trial'}
          </button>
        </form>

        {/* Additional Info */}
        <p className="text-center font-noto text-xs text-[#999999] mt-6">
          Already have an account?{' '}
          <a href="https://app.avniproject.org" className="text-[#419372] hover:underline font-medium">
            Log in
          </a>
        </p>
      </div>

      {/* Custom styles for phone input */}
      <style jsx global>{`
        .phone-input-custom {
          padding: 12px 16px;
        }
        .phone-input-custom input {
          border: none !important;
          outline: none !important;
          font-family: 'Noto Sans', sans-serif;
          font-size: 14px;
        }
        .PhoneInputCountry {
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
}
