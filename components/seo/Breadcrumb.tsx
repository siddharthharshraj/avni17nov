/**
 * Breadcrumb Component
 * SEO-friendly breadcrumb navigation with structured data
 */

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbSchema } from './StructuredData';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Always include home as first item
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    ...items,
  ];

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Visual Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm ${className}`}
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isHome = index === 0;

            return (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                )}
                
                {isLast ? (
                  <span
                    className="font-medium text-gray-900"
                    aria-current="page"
                  >
                    {isHome ? (
                      <Home className="w-4 h-4" aria-label="Home" />
                    ) : (
                      item.name
                    )}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {isHome ? (
                      <Home className="w-4 h-4" aria-label="Home" />
                    ) : (
                      item.name
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
