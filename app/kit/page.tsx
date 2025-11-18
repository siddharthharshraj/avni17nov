'use client';

/**
 * Avni Brand Kit Page
 * Internal resource for developers and social media managers
 * Contains brand assets, colors, typography, and UTM link generator
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Download, Copy, Check, Facebook, Linkedin, Youtube } from 'lucide-react';

export default function AvniBrandKitPage() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  
  // Auto-detect current domain
  const [websiteUrl, setWebsiteUrl] = useState('');
  
  useEffect(() => {
    // Auto-detect the current website URL
    if (typeof window !== 'undefined') {
      const currentOrigin = window.location.origin;
      setWebsiteUrl(currentOrigin);
    }
  }, []);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmContent, setUtmContent] = useState('');
  const [utmTerm, setUtmTerm] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState<Record<string, string>>({});

  const socialPlatforms = [
    { id: 'facebook', name: 'Facebook', color: '#1877F2', icon: Facebook },
    { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2', icon: Linkedin },
    { id: 'twitter', name: 'X (Twitter)', color: '#000000', icon: 'X' },
    { id: 'youtube', name: 'YouTube', color: '#FF0000', icon: Youtube },
  ];

  const brandColors = [
    { name: 'Primary Green', hex: '#419372', usage: 'Primary brand color, CTAs, links' },
    { name: 'Primary Dark', hex: '#0B2540', usage: 'Headings, dark text' },
    { name: 'Background', hex: '#FCFCFC', usage: 'Page background' },
    { name: 'Accent Orange', hex: '#FF8854', usage: 'Tags, highlights, badges' },
    { name: 'Accent Yellow', hex: '#FFD84D', usage: 'Highlights, emphasis' },
    { name: 'Lavender', hex: '#E9EAF8', usage: 'Section backgrounds, quotes' },
    { name: 'Text Gray', hex: '#5A6C7D', usage: 'Body text, secondary text' },
    { name: 'Border Gray', hex: '#E6E6E6', usage: 'Borders, dividers' },
  ];

  const typography = [
    {
      category: 'Headings',
      font: 'Anek Latin',
      weights: ['500', '600', '700'],
      sizes: [
        { name: 'H1', size: '48-56px', lineHeight: '1.2', usage: 'Page titles' },
        { name: 'H2', size: '36-48px', lineHeight: '1.2', usage: 'Section headings' },
        { name: 'H3', size: '30px', lineHeight: '30px', usage: 'Subsection headings' },
        { name: 'H4', size: '24px', lineHeight: '1.3', usage: 'Card titles' },
      ],
    },
    {
      category: 'Body Text',
      font: 'Noto Sans',
      weights: ['400', '500'],
      sizes: [
        { name: 'Large', size: '19-24px', lineHeight: '1.6', usage: 'Hero descriptions' },
        { name: 'Base', size: '16-17px', lineHeight: '1.6', usage: 'Body paragraphs' },
        { name: 'Small', size: '14px', lineHeight: '1.5', usage: 'Captions, labels' },
      ],
    },
  ];

  const brandAssets = [
    {
      name: 'Avni Logo (Full)',
      file: 'avni-logo-full.png',
      description: 'Primary logo with icon and text',
      downloadUrl: '/images/brand/avni-logo-full.png',
    },
    {
      name: 'Avni Icon',
      file: 'avni-icon.png',
      description: 'Standalone icon for social media',
      downloadUrl: '/images/brand/avni-icon.png',
    },
    {
      name: 'Avni Logo (White)',
      file: 'avni-logo-white.png',
      description: 'Logo for dark backgrounds',
      downloadUrl: '/images/brand/avni-logo-white.png',
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev =>
      prev.includes(sourceId)
        ? prev.filter(s => s !== sourceId)
        : [...prev, sourceId]
    );
  };

  const generateLinks = () => {
    if (!utmMedium || !utmCampaign || selectedSources.length === 0) {
      alert('Please fill in required fields: Medium, Campaign, and select at least one platform');
      return;
    }

    const links: Record<string, string> = {};
    selectedSources.forEach(source => {
      const params = new URLSearchParams();
      params.append('utm_source', source);
      params.append('utm_medium', utmMedium);
      params.append('utm_campaign', utmCampaign);
      if (utmContent) params.append('utm_content', utmContent);
      if (utmTerm) params.append('utm_term', utmTerm);

      links[source] = `${websiteUrl}?${params.toString()}`;
    });

    setGeneratedLinks(links);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#419372] font-noto text-sm font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Avni Website
          </Link>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-anek font-bold text-5xl lg:text-6xl text-[#0b2540] mb-4">
            Avni Brand Kit
          </h1>
          <p className="font-noto text-lg text-[#5a6c7d] max-w-3xl">
            Official brand assets, design guidelines, and tools for developers and social media managers.
            Maintain consistency across all Avni communications.
          </p>
        </div>

        {/* Brand Assets Section */}
        <section className="mb-16">
          <h2 className="font-anek font-bold text-3xl text-[#0b2540] mb-6">
            Brand Assets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandAssets.map((asset) => (
              <div
                key={asset.name}
                className="border border-[#E6E6E6] rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="bg-[#FCFCFC] rounded-lg p-8 mb-4 flex items-center justify-center min-h-[200px] relative">
                  {asset.name === 'Avni Logo (Full)' && (
                    <Image
                      src="/avni-logo.svg"
                      alt="Avni Logo"
                      width={200}
                      height={60}
                      className="object-contain"
                    />
                  )}
                  {asset.name === 'Avni Icon' && (
                    <div className="w-24 h-24 bg-[#419372] rounded-2xl flex items-center justify-center">
                      <div className="text-white font-bold text-4xl">A</div>
                    </div>
                  )}
                  {asset.name === 'Avni Logo (White)' && (
                    <div className="bg-[#0b2540] p-8 rounded-lg">
                      <Image
                        src="/avni-logo.svg"
                        alt="Avni Logo White"
                        width={200}
                        height={60}
                        className="object-contain brightness-0 invert"
                      />
                    </div>
                  )}
                </div>
                <h3 className="font-anek font-semibold text-lg text-[#0b2540] mb-2">
                  {asset.name}
                </h3>
                <p className="font-noto text-sm text-[#5a6c7d] mb-4">
                  {asset.description}
                </p>
                <button
                  onClick={() => window.open(asset.downloadUrl, '_blank')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#419372] text-white font-anek font-medium text-sm rounded-lg hover:bg-[#357a5e] transition-colors w-full justify-center"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Colors Section */}
        <section className="mb-16">
          <h2 className="font-anek font-bold text-3xl text-[#0b2540] mb-6">
            Brand Colors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandColors.map((color) => (
              <div
                key={color.hex}
                className="border border-[#E6E6E6] rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className="h-32"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-4">
                  <h3 className="font-anek font-semibold text-base text-[#0b2540] mb-2">
                    {color.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="font-mono text-sm text-[#5a6c7d] bg-[#FCFCFC] px-2 py-1 rounded">
                      {color.hex}
                    </code>
                    <button
                      onClick={() => handleCopy(color.hex, color.hex)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Copy hex code"
                    >
                      {copiedItem === color.hex ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#5a6c7d]" />
                      )}
                    </button>
                  </div>
                  <p className="font-noto text-xs text-[#5a6c7d]">
                    {color.usage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="font-anek font-bold text-3xl text-[#0b2540] mb-6">
            Typography
          </h2>
          <div className="space-y-8">
            {typography.map((typeGroup) => (
              <div
                key={typeGroup.category}
                className="border border-[#E6E6E6] rounded-xl p-6"
              >
                <div className="mb-6">
                  <h3 className="font-anek font-bold text-xl text-[#0b2540] mb-2">
                    {typeGroup.category}
                  </h3>
                  <p className="font-noto text-sm text-[#5a6c7d]">
                    Font Family: <span className="font-semibold">{typeGroup.font}</span> | 
                    Weights: {typeGroup.weights.join(', ')}
                  </p>
                </div>
                <div className="space-y-4">
                  {typeGroup.sizes.map((size) => (
                    <div
                      key={size.name}
                      className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="md:w-1/4">
                        <span className="font-anek font-semibold text-sm text-[#0b2540]">
                          {size.name}
                        </span>
                      </div>
                      <div className="md:w-3/4">
                        <div className="mb-2">
                          <code className="font-mono text-xs text-[#5a6c7d] bg-[#FCFCFC] px-2 py-1 rounded">
                            {size.size} / Line Height: {size.lineHeight}
                          </code>
                        </div>
                        <p className="font-noto text-xs text-[#5a6c7d]">
                          Usage: {size.usage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* UTM Link Generator Section */}
        <section className="mb-16">
          <h2 className="font-anek font-bold text-3xl text-[#0b2540] mb-6">
            UTM Link Generator
          </h2>
          <div className="border border-[#E6E6E6] rounded-xl p-6 lg:p-8">
            <p className="font-noto text-sm text-[#5a6c7d] mb-6">
              Generate trackable links for social media campaigns. Select platforms and fill in campaign details.
            </p>

            <div className="space-y-6">
              {/* Website URL - Auto-detected */}
              <div>
                <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
                  Website URL <span className="text-red-500">*</span>
                  <span className="font-normal text-[#419372] ml-2 text-xs">(Auto-detected)</span>
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="Auto-detecting current domain..."
                  className="w-full px-4 py-3 border border-[#E6E6E6] rounded-lg font-noto text-sm focus:outline-none focus:ring-2 focus:ring-[#419372] bg-[#FCFCFC]"
                />
                <p className="font-noto text-xs text-[#5a6c7d] mt-1">
                  Current domain is automatically detected. Edit if needed.
                </p>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-3">
                  Select Platforms <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {socialPlatforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedSources.includes(platform.id);
                    
                    return (
                      <button
                        key={platform.id}
                        onClick={() => toggleSource(platform.id)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg font-anek font-medium text-sm transition-all ${
                          isSelected
                            ? 'border-[#419372] bg-[#419372] text-white'
                            : 'border-[#E6E6E6] text-[#5a6c7d] hover:border-[#419372]'
                        }`}
                      >
                        {Icon === 'X' ? (
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            style={{ color: isSelected ? 'white' : platform.color }}
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        ) : (
                          <Icon 
                            className="w-4 h-4" 
                            style={{ color: isSelected ? 'white' : platform.color }}
                          />
                        )}
                        {platform.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* UTM Medium */}
              <div>
                <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
                  UTM Medium <span className="text-red-500">*</span>
                  <span className="font-normal text-[#5a6c7d] ml-2">(utm_medium)</span>
                </label>
                <input
                  type="text"
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  placeholder="e.g., social, email, cpc"
                  className="w-full px-4 py-3 border border-[#E6E6E6] rounded-lg font-noto text-sm focus:outline-none focus:ring-2 focus:ring-[#419372]"
                />
              </div>

              {/* UTM Campaign */}
              <div>
                <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
                  UTM Campaign <span className="text-red-500">*</span>
                  <span className="font-normal text-[#5a6c7d] ml-2">(utm_campaign)</span>
                </label>
                <input
                  type="text"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  placeholder="e.g., summer_launch_2024"
                  className="w-full px-4 py-3 border border-[#E6E6E6] rounded-lg font-noto text-sm focus:outline-none focus:ring-2 focus:ring-[#419372]"
                />
              </div>

              {/* UTM Content */}
              <div>
                <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
                  UTM Content
                  <span className="font-normal text-[#5a6c7d] ml-2">(utm_content)</span>
                </label>
                <input
                  type="text"
                  value={utmContent}
                  onChange={(e) => setUtmContent(e.target.value)}
                  placeholder="e.g., banner_ad, text_link"
                  className="w-full px-4 py-3 border border-[#E6E6E6] rounded-lg font-noto text-sm focus:outline-none focus:ring-2 focus:ring-[#419372]"
                />
              </div>

              {/* UTM Term */}
              <div>
                <label className="block font-anek font-semibold text-sm text-[#0b2540] mb-2">
                  UTM Term
                  <span className="font-normal text-[#5a6c7d] ml-2">(utm_term)</span>
                </label>
                <input
                  type="text"
                  value={utmTerm}
                  onChange={(e) => setUtmTerm(e.target.value)}
                  placeholder="e.g., ngo_software"
                  className="w-full px-4 py-3 border border-[#E6E6E6] rounded-lg font-noto text-sm focus:outline-none focus:ring-2 focus:ring-[#419372]"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generateLinks}
                className="w-full px-6 py-4 bg-[#419372] text-white font-anek font-semibold text-base rounded-lg hover:bg-[#357a5e] transition-colors"
              >
                Generate Links
              </button>

              {/* Generated Links */}
              {Object.keys(generatedLinks).length > 0 && (
                <div className="mt-8 space-y-4">
                  <h3 className="font-anek font-bold text-lg text-[#0b2540]">
                    Generated Links
                  </h3>
                  {Object.entries(generatedLinks).map(([source, link]) => (
                    <div
                      key={source}
                      className="border border-[#E6E6E6] rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-anek font-semibold text-sm text-[#0b2540] capitalize">
                          {source}
                        </span>
                        <button
                          onClick={() => handleCopy(link, source)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#419372] text-white font-anek text-xs rounded hover:bg-[#357a5e] transition-colors"
                        >
                          {copiedItem === source ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy Link
                            </>
                          )}
                        </button>
                      </div>
                      <code className="block font-mono text-xs text-[#5a6c7d] bg-[#FCFCFC] px-3 py-2 rounded break-all">
                        {link}
                      </code>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="font-noto text-sm text-[#5a6c7d]">
            This page is for internal use only. For questions, contact the Avni team.
          </p>
        </div>
      </main>
    </div>
  );
}
