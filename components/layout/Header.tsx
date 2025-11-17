"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import ProductServicesDropdown from "@/components/navigation/ProductServicesDropdown";
import SolutionsDropdown from "@/components/navigation/SolutionsDropdown";
import ResourcesDropdown from "@/components/navigation/ResourcesDropdown";
import MobileMenu from "@/components/layout/MobileMenu";
import { useIsDesktop } from "@/hooks/useMediaQuery";

export default function Header() {
  const pathname = usePathname();
  const [isProductServicesOpen, setIsProductServicesOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDesktop = useIsDesktop();

  // Check if current path matches navigation item
  const isActive = (path: string) => {
    if (path === '/pricing' || path === '/about') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const handleMouseLeave = (dropdown: 'products' | 'solutions' | 'resources') => {
    const timeout = setTimeout(() => {
      if (dropdown === 'products') {
        setIsProductServicesOpen(false);
      } else if (dropdown === 'solutions') {
        setIsSolutionsOpen(false);
      } else {
        setIsResourcesOpen(false);
      }
    }, 300); // 300ms delay for smooth UX
    setCloseTimeout(timeout);
  };

  const handleMouseEnter = (dropdown: 'products' | 'solutions' | 'resources') => {
    // Clear any existing timeout
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    
    if (dropdown === 'products') {
      setIsProductServicesOpen(true);
      setIsSolutionsOpen(false);
      setIsResourcesOpen(false);
    } else if (dropdown === 'solutions') {
      setIsSolutionsOpen(true);
      setIsProductServicesOpen(false);
      setIsResourcesOpen(false);
    } else {
      setIsResourcesOpen(true);
      setIsProductServicesOpen(false);
      setIsSolutionsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white h-[72px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] border-b border-gray-100 z-50">
      <div className="relative max-w-[1440px] w-full h-full mx-auto px-6 lg:px-12">
        {/* Logo Component */}
        <Link 
          href="/" 
          className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 flex items-center gap-2 md:gap-[11px]"
        >
          <div className="relative w-[80px] h-9 md:w-[100px] md:h-[45px]">
            <Image
              src="/header-logo.png"
              alt="Avni Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Mobile Menu */}
        <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 lg:hidden">
          <MobileMenu isOpen={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </div>

        {/* Desktop Navigation - Starts after logo */}
        <div className="max-lg:!hidden hidden lg:flex items-center absolute left-[200px] top-1/2 -translate-y-1/2 gap-8">
        <div 
          className="relative group"
          onMouseEnter={() => handleMouseEnter('products')}
          onMouseLeave={() => handleMouseLeave('products')}
        >
          <button 
            className="flex items-center gap-[8px] font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] transition-colors relative"
          >
            Product Services
            <ChevronDown className="w-[20px] h-[20px]" />
            <span className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[#419372] transition-all duration-300 ${isActive('/services') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}`}></span>
          </button>
        </div>
        
        {/* Solutions */}
        <div 
          className="relative group"
          onMouseEnter={() => handleMouseEnter('solutions')}
          onMouseLeave={() => handleMouseLeave('solutions')}
        >
          <button 
            className="flex items-center gap-[8px] font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] transition-colors relative"
          >
            Solutions
            <ChevronDown className="w-[20px] h-[20px]" />
            <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#419372] transition-all duration-300 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"></span>
          </button>
        </div>
        
        {/* Pricing */}
        <div 
          className="relative group"
          onMouseEnter={() => {
            setIsProductServicesOpen(false);
            setIsSolutionsOpen(false);
            setIsResourcesOpen(false);
          }}
        >
          <Link
            href="/pricing"
            className="font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] transition-colors relative inline-block"
          >
            Pricing
            <span className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[#419372] transition-all duration-300 ${isActive('/pricing') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}`}></span>
          </Link>
        </div>
        
        {/* About */}
        <div 
          className="relative group"
          onMouseEnter={() => {
            setIsProductServicesOpen(false);
            setIsSolutionsOpen(false);
            setIsResourcesOpen(false);
          }}
        >
          <Link
            href="/about"
            className="font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] transition-colors relative inline-block"
          >
            About
            <span className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[#419372] transition-all duration-300 ${isActive('/about') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}`}></span>
          </Link>
        </div>
        
        {/* Resources */}
        <div 
          className="relative group"
          onMouseEnter={() => handleMouseEnter('resources')}
          onMouseLeave={() => handleMouseLeave('resources')}
        >
          <button className="flex items-center gap-[8px] font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] transition-colors relative">
            Resources
            <ChevronDown className="w-[20px] h-[20px]" />
            <span className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[#419372] transition-all duration-300 ${isActive('/resources') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}`}></span>
          </button>
        </div>
        </div>

        {/* Right Side Actions - Desktop only */}
        <div className="max-lg:!hidden hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 items-center gap-4">
        {/* Login */}
        <div>
          <a
            href="https://app.avniproject.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] transition-colors"
          >
            Login
          </a>
        </div>

        {/* Separator */}
        <span className="font-anek text-[16px] text-[#0b2540]">|</span>

        {/* Sign up */}
        <div>
          <Link
            href="/signup"
            className="font-anek font-medium text-[16px] leading-[40px] text-[#0b2540] transition-colors"
          >
            Sign up
          </Link>
        </div>

        {/* Request Demo Button */}
        <div>
          <a
            href="https://calendly.com/avni-marketing-samanvayfoundation/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-[142px] h-[36px] border-2 border-primary rounded-[28px] font-anek font-medium text-[16px] leading-[16px] text-primary hover:bg-primary hover:text-white transition-all"
          >
            Schedule a Demo
          </a>
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

      {/* Resources Dropdown */}
      <ResourcesDropdown 
        isOpen={isResourcesOpen} 
        onClose={() => setIsResourcesOpen(false)}
        onMouseEnter={() => handleMouseEnter('resources')}
        onMouseLeave={() => handleMouseLeave('resources')}
      />
    </header>
  );
}
