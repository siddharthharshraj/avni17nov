/**
 * Application Constants
 * Centralized constants for better maintainability
 */

// Brand Colors
export const COLORS = {
  primary: '#419372',
  secondary: '#fba57f', 
  accent: '#FFD84D',
  navy: '#0a1f3d',
  darkNavy: '#0b2540',
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717'
  },
  text: {
    primary: '#0a1f3d',
    secondary: '#5a6c7d',
    muted: '#999999'
  }
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

// Animation Durations
export const ANIMATIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms'
} as const;

// Layout Constants
export const LAYOUT = {
  headerHeight: '72px',
  maxWidth: '1440px',
  containerPadding: {
    mobile: '1.5rem', // 24px
    desktop: '3rem'   // 48px
  }
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  newsletter: '/api/newsletter',
  contact: '/api/contact',
  demo: '/api/demo'
} as const;

// External Links
export const EXTERNAL_LINKS = {
  github: 'https://github.com/avni-project',
  documentation: 'https://docs.avni-project.org',
  community: 'https://community.avni-project.org'
} as const;

// SEO Defaults
export const SEO_DEFAULTS = {
  siteName: 'Avni',
  description: 'Empowering NGOs with simple, sustainable digital tools for field work and impact measurement.',
  keywords: ['NGO', 'digital tools', 'field work', 'impact measurement', 'open source'],
  image: '/images/og-image.jpg',
  url: 'https://avni.org'
} as const;

// Form Validation
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  maxLengths: {
    name: 100,
    email: 254,
    message: 1000,
    organization: 200
  }
} as const;
