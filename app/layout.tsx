import type { Metadata } from "next";
import { Anek_Latin, Noto_Sans } from "next/font/google";
import "./globals.css";
import { WebVitals } from "./web-vitals";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  variable: "--font-anek-latin",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
  weight: ["500", "600"],
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Open-source AI-powered Offline-capable Data collection and Reporting platform for Non-profits",
    template: "%s | Avni"
  },
  description: "Open-source AI-powered platform for offline data collection and reporting. Built for non-profits with case management, mobile data collection, and intelligent reporting. Digitize your field work with Avni.",
  keywords: ["open source", "AI-powered", "offline data collection", "reporting platform", "non-profits", "NGO software", "field data collection", "case management", "mobile health", "offline-capable", "data reporting", "nonprofit technology"],
  authors: [{ name: "Avni" }],
  creator: "Avni",
  publisher: "Avni",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://avniproject.org'),
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/favicon.ico' },
    ],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Avni - Field Data Collection & Monitoring Platform",
    description: "Digitize your field work with Avni - a powerful platform for case management, reporting, and mobile data collection.",
    url: 'https://avniproject.org',
    siteName: 'Avni',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Avni Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Avni - Field Data Collection & Monitoring Platform",
    description: "Digitize your field work with Avni - a powerful platform for case management, reporting, and mobile data collection.",
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'verification-pending',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anekLatin.variable} ${notoSans.variable}`}>
      <head>
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Avni" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Critical inline CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{__html: `
          body{margin:0;font-family:system-ui,-apple-system,sans-serif}
          .hero-section{min-height:100vh;display:flex;align-items:center}
          img{max-width:100%;height:auto}
        `}} />
        
        {/* Preload LCP Image - HIGHEST PRIORITY */}
        <link 
          rel="preload" 
          as="image" 
          href="/hero-main.webp" 
          type="image/webp"
        />
        
        {/* Preconnect only for fonts - critical path */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://avniproject.org/" />
        <meta name="theme-color" content="#419372" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="font-noto">
        <GoogleAnalytics />
        <ServiceWorkerRegistration />
        <OrganizationSchema />
        <WebsiteSchema />
        {children}
        <WebVitals />
      </body>
    </html>
  );
}
