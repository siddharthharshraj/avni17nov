/**
 * Design System - Color Tokens
 * Centralized color definitions for consistent theming
 */

export const colors = {
  // Primary Colors
  primary: {
    green: '#1F7A63',
    orange: '#fba47e',
    darkBlue: '#0b2540',
  },

  // Accent Colors
  accent: {
    peach: '#fba47e',
    yellow: '#f3ca40',
    lightOrange: '#ff7751',
  },

  // Neutral Colors
  neutral: {
    white: '#ffffff',
    offWhite: '#fcfcfc',
    lightGray: '#F5F5F5',
    gray: '#D9D9D9',
    darkGray: '#1F1F1F',
    black: '#000000',
  },

  // Text Colors
  text: {
    primary: '#0b2540',
    secondary: '#000000',
    muted: 'rgba(0, 0, 0, 0.8)',
    light: 'rgba(0, 0, 0, 0.6)',
  },

  // Gradient
  gradient: {
    announcement: 'linear-gradient(90deg, rgba(251, 164, 126, 0.64) 0%, rgba(255, 119, 81, 0.64) 33.17%, rgba(243, 202, 64, 0.64) 100%)',
  },
} as const;

export type ColorToken = typeof colors;
