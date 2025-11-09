"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ProductServicesDropdown from "@/components/navigation/ProductServicesDropdown";
import SolutionsDropdown from "@/components/navigation/SolutionsDropdown";
import MobileMenu from "@/components/layout/MobileMenu";
import { useIsDesktop } from "@/hooks/useMediaQuery";

export default function Header() {
  const [isProductServicesOpen, setIsProductServicesOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const handleMouseLeave = (dropdown: 'products' | 'solutions') => {
    const timeout = setTimeout(() => {
      if (dropdown === 'products') {
        setIsProductServicesOpen(false);
      } else {
        setIsSolutionsOpen(false);
      }
    }, 10000); // 10 seconds delay
    setCloseTimeout(timeout);
  };

  const handleMouseEnter = (dropdown: 'products' | 'solutions') => {
    // Clear any existing timeout
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    
    if (dropdown === 'products') {
      setIsProductServicesOpen(true);
      setIsSolutionsOpen(false);
    } else {
      setIsSolutionsOpen(true);
      setIsProductServicesOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#fefefe] h-[72px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.03)] z-50">
      <div className="relative max-w-7xl w-full h-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Logo Component */}
        <Link 
          href="/" 
          className="absolute left-4 sm:left-6 lg:left-8 2xl:left-12 top-1/2 -translate-y-1/2 flex items-center gap-2 md:gap-[11px]"
        >
          <div className="relative w-10 h-9 md:w-[49px] md:h-[45px]">
            <Image
              src="/logos/header-logo.png"
              alt="Avni Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-anek font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight text-[#000000]">Avni</span>
        </Link>

        {/* Mobile Menu */}
        <div className="absolute right-4 sm:right-6 lg:right-8 2xl:right-12 top-1/2 -translate-y-1/2">
          <MobileMenu isOpen={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="max-lg:!hidden hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8">
        <div 
          className="relative"
          onMouseEnter={() => handleMouseEnter('products')}
          onMouseLeave={() => handleMouseLeave('products')}
        >
          <button 
            className="flex items-center gap-[16px] font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] hover:text-primary transition-colors"
          >
            Product Services
            <ChevronDown className={`w-[20px] h-[20px] transition-transform duration-300 ${isProductServicesOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Solutions */}
        <div 
          className="relative"
          onMouseEnter={() => handleMouseEnter('solutions')}
          onMouseLeave={() => handleMouseLeave('solutions')}
        >
          <button 
            className="flex items-center gap-[8px] font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] hover:text-primary transition-colors"
          >
            Solutions
            <ChevronDown className={`w-[20px] h-[20px] transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Pricing */}
        <div>
          <Link
            href="/pricing"
            className="font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </div>
        
        {/* About */}
        <div>
          <Link
            href="/about"
            className="font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] hover:text-primary transition-colors"
          >
            About
          </Link>
        </div>
        
        {/* Resources */}
        <div>
          <button className="flex items-center gap-[8px] font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] hover:text-primary transition-colors">
            Resources
            <ChevronDown className="w-[20px] h-[20px]" />
          </button>
        </div>
        </div>

        {/* Right Side Actions - Desktop only */}
        <div className="max-lg:!hidden hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 items-center gap-4">
        {/* Login */}
        <div>
          <Link
            href="/login"
            className="font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] hover:text-primary transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Separator */}
        <span className="font-anek text-[16px] text-[#0b2540]">|</span>

        {/* Sign up */}
        <div>
          <Link
            href="/signup"
            className="font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] hover:text-primary transition-colors"
          >
            Sign up
          </Link>
        </div>

        {/* Request Demo Button */}
        <div>
          <Link
            href="/demo"
            className="flex items-center justify-center w-[142px] h-[36px] border-2 border-primary rounded-[28px] font-anek font-medium text-[16px] leading-[16px] text-primary hover:bg-primary hover:text-white transition-all"
          >
            Request a Demo
          </Link>
        </div>
        </div>
      </div>

      {/* Product Services Dropdown */}
      <ProductServicesDropdown 
        isOpen={isProductServicesOpen} 
        onClose={() => setIsProductServicesOpen(false)}
        onMouseEnter={() => handleMouseEnter('products')}
        onMouseLeave={() => handleMouseLeave('products')}
      />

      {/* Solutions Dropdown */}
      <SolutionsDropdown 
        isOpen={isSolutionsOpen} 
        onClose={() => setIsSolutionsOpen(false)}
        onMouseEnter={() => handleMouseEnter('solutions')}
        onMouseLeave={() => handleMouseLeave('solutions')}
      />
    </header>
  );
}
