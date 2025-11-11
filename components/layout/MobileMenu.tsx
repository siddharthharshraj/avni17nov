/**
 * Mobile Navigation Component - COMPLETE IMPLEMENTATION
 * Portal-based full-screen overlay with centered modal submenus
 */

'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { 
  productServicesTabs,
  servicesItems,
  useCasesItems,
  solutionsItems,
  resourcesItems,
} from '@/data/navigation';

type SubmenuType = 'product-services' | 'solutions' | 'resources' | null;
type ProductTab = 'services' | 'use-cases';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<SubmenuType>(null);
  const [activeProductTab, setActiveProductTab] = useState<ProductTab>('services');

  // Ensure component is mounted (for portal)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset submenu when main menu closes
  useEffect(() => {
    if (!isOpen) {
      setActiveSubmenu(null);
      setActiveProductTab('services');
    }
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key - close submenu first, then overlay
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeSubmenu) {
          setActiveSubmenu(null);
        } else if (isOpen) {
          onToggle();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, activeSubmenu, onToggle]);

  const handleBackToMain = () => {
    setActiveSubmenu(null);
  };

  const handleCloseAll = () => {
    setActiveSubmenu(null);
    onToggle();
  };

  const handleSubmenuClick = (submenu: SubmenuType) => {
    setActiveSubmenu(submenu);
  };

  // Get current tab items
  const currentTabItems = activeProductTab === 'services' ? servicesItems : useCasesItems;

  // Don't render portal on server
  if (!mounted) {
    return (
      <button
        onClick={onToggle}
        className="block lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open navigation menu"
        aria-expanded="false"
        aria-controls="mobile-nav-overlay"
      >
        <Menu className="w-6 h-6 text-[#0b2540]" />
      </button>
    );
  }

  return (
    <>
      {/* Hamburger Button - ONLY MOBILE */}
      <button
        onClick={onToggle}
        className="block lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-overlay"
      >
        <Menu className="w-6 h-6 text-[#0b2540]" />
      </button>

      {/* Main Mobile Overlay - PORTAL TO BODY */}
      {isOpen && createPortal(
        <div 
          id="mobile-nav-overlay"
          role="navigation"
          aria-label="Mobile navigation"
          className="fixed z-50 bg-white lg:hidden flex flex-col"
          style={{ 
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: 'calc(100vh - 72px)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 h-16 bg-white">
            <h2 className="text-xl font-bold text-[#0b2540]">Menu</h2>
            <button
              onClick={handleCloseAll}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-6 h-6 text-[#0b2540]" />
            </button>
          </div>
          
          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto px-4 py-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>

            <nav className="flex flex-col space-y-1" role="menu">
                
                {/* Product Services */}
                <button
                  onClick={() => handleSubmenuClick('product-services')}
                  className="flex items-center justify-between w-full py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="font-anek font-medium text-base text-[#0b2540] group-hover:text-[#419372]">
                    Product Services
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#419372]" />
                </button>
                <div className="h-px bg-gray-200"></div>

                {/* Solutions */}
                <button
                  onClick={() => handleSubmenuClick('solutions')}
                  className="flex items-center justify-between w-full py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="font-anek font-medium text-base text-[#0b2540] group-hover:text-[#419372]">
                    Solutions
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#419372]" />
                </button>
                <div className="h-px bg-gray-200"></div>

                {/* Pricing */}
                <Link
                  href="/pricing"
                  onClick={handleCloseAll}
                  className="flex items-center justify-between w-full py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="font-anek font-medium text-base text-[#0b2540] group-hover:text-[#419372]">
                    Pricing
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#419372]" />
                </Link>
                <div className="h-px bg-gray-200"></div>

                {/* About */}
                <Link
                  href="/about"
                  onClick={handleCloseAll}
                  className="flex items-center justify-between w-full py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="font-anek font-medium text-base text-[#0b2540] group-hover:text-[#419372]">
                    About
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#419372]" />
                </Link>
                <div className="h-px bg-gray-200"></div>

                {/* Resources */}
                <button
                  onClick={() => handleSubmenuClick('resources')}
                  className="flex items-center justify-between w-full py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="font-anek font-medium text-base text-[#0b2540] group-hover:text-[#419372]">
                    Resources
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#419372]" />
                </button>
                <div className="h-px bg-gray-200"></div>

                {/* CTA Buttons */}
                <div className="pt-8 space-y-3">
                  <Link
                    href="/signup"
                    onClick={handleCloseAll}
                    className="block w-full py-3 text-center font-anek font-semibold text-base text-white bg-[#419372] rounded-full hover:bg-[#357a5e] transition-all shadow-md"
                  >
                    Sign Up for Free Trial
                  </Link>
                  
                  <Link
                    href="/demo"
                    onClick={handleCloseAll}
                    className="block w-full py-3 text-center font-anek font-semibold text-base text-[#419372] border-2 border-[#419372] rounded-full hover:bg-[#419372] hover:text-white transition-all"
                  >
                    Request a Demo
                  </Link>
                  
                  <Link
                    href="/login"
                    onClick={handleCloseAll}
                    className="block w-full min-h-[48px] py-3 text-center font-anek font-semibold text-base text-[#0b2540] border-2 border-gray-300 rounded-full hover:bg-[#419372] hover:border-[#419372] hover:text-white transition-all"
                  >
                    Login
                  </Link>
                </div>
            </nav>
          </div>
        </div>,
        document.body
      )}

      {/* Submenu Modal - PORTAL TO BODY */}
      {activeSubmenu && createPortal(
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:hidden"
          onClick={handleBackToMain}
          style={{ display: 'flex' }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Modal Card */}
          <div 
            className={`relative w-full ${activeSubmenu === 'product-services' ? 'max-w-lg' : 'max-w-md'} max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="submenu-title"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <button
                onClick={handleBackToMain}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Back to main menu"
              >
                <ChevronLeft className="w-5 h-5 text-[#0b2540]" />
                <span className="font-anek font-medium text-base text-gray-600">Back</span>
              </button>
              
              <h2 id="submenu-title" className="font-anek font-bold text-lg text-[#0b2540]">
                {activeSubmenu === 'product-services' ? 'Product Services' : activeSubmenu === 'solutions' ? 'Solutions' : 'Resources'}
              </h2>
              
              <button
                onClick={handleCloseAll}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-[#0b2540]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto">
              
              {/* Product Services Content */}
              {activeSubmenu === 'product-services' && (
                <div>
                  {/* Tab Switcher */}
                  <div className="p-6 pb-4">
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                    {productServicesTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveProductTab(tab.id as ProductTab)}
                        className={`flex-1 py-2 px-4 rounded-md font-anek font-medium text-sm transition-all ${
                          activeProductTab === tab.id
                            ? 'bg-white text-[#0b2540] shadow-sm'
                            : 'text-gray-600 hover:text-[#0b2540]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="px-6 pb-6 space-y-2">
                  {currentTabItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.link}
                      onClick={handleCloseAll}
                      className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="relative w-6 h-6 flex-shrink-0 mt-0.5">
                        <Image
                          src={item.icon}
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-anek font-semibold text-base text-[#0b2540] group-hover:text-[#419372] mb-1">
                          {item.title}
                        </h3>
                        <p className="font-noto text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#419372] flex-shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>

                {/* Featured Section */}
                <div className="mx-6 mb-6 p-4 bg-[#FFF8F8] rounded-lg border border-[#FBA47E]/20">
                  <h3 className="font-anek font-bold text-sm text-[#0b2540] mb-2">
                    STILL IN DOUBT?
                  </h3>
                  <p className="font-noto text-sm text-gray-600 mb-3">
                    Speak to our sales team for further details
                  </p>
                  <Link
                    href="/contact"
                    onClick={handleCloseAll}
                    className="inline-flex items-center font-anek font-medium text-sm text-[#419372] hover:text-[#357a5e]"
                  >
                    Contact Sales →
                  </Link>
                </div>
              </div>
            )}

              {/* Resources Content */}
              {activeSubmenu === 'resources' && (
                <div>
                  {/* Resources List */}
                  <div className="px-6 py-6 space-y-2">
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.link}
                        onClick={handleCloseAll}
                        className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="relative w-6 h-6 flex-shrink-0 mt-0.5">
                          <Image
                            src={item.icon}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-anek font-semibold text-base text-[#0b2540] group-hover:text-[#419372] mb-1">
                            {item.title}
                          </h3>
                          <p className="font-noto text-sm text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#419372] flex-shrink-0 mt-1" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Solutions Content */}
              {activeSubmenu === 'solutions' && (
                <div>
                  {/* Section Label */}
                  <div className="px-6 pt-6 pb-2">
                  <p className="font-anek font-bold text-xs text-gray-500 uppercase tracking-wide">
                    BY SECTOR
                  </p>
                </div>

                {/* Solutions List */}
                <div className="px-6 pb-6 space-y-2">
                  {solutionsItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.link}
                      onClick={handleCloseAll}
                      className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="relative w-6 h-6 flex-shrink-0 mt-0.5">
                        <Image
                          src={item.icon}
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-anek font-semibold text-base text-[#0b2540] group-hover:text-[#419372] mb-1">
                          {item.title}
                        </h3>
                        <p className="font-noto text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#419372] flex-shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
