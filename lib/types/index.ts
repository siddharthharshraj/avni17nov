/**
 * Global TypeScript type definitions
 * Centralized type definitions for better maintainability
 */

// Navigation Types
export interface NavigationItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface DropdownTab {
  id: string;
  label: string;
  icon: string;
}

// Content Types
export interface ServiceItem extends NavigationItem {}
export interface UseCaseItem extends NavigationItem {}
export interface SolutionItem extends NavigationItem {}
export interface ResourceItem extends NavigationItem {}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

// Page Props Types
export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}
