import type { Metadata } from "next";
import { Anek_Latin, Noto_Sans } from "next/font/google";
import "./globals.css";
import { WebVitals } from "./web-vitals";

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  variable: "--font-anek-latin",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Avni - Field Data Collection & Monitoring Platform",
  description: "Digitize your field work with Avni - a powerful platform for case management, reporting, cohort studies, and mobile data collection. Built for NGOs and healthcare programs.",
  keywords: ["field data collection", "case management", "mobile health", "NGO software", "healthcare monitoring", "data collection platform"],
  authors: [{ name: "Avni" }],
  creator: "Avni",
  publisher: "Avni",
  metadataBase: new URL('https://avniproject.org'),
  icons: {
    icon: '/logos/avni-logo.png',
    apple: '/logos/avni-logo.png',
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
  verification: {
    google: 'your-google-verification-code',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#419372" />
        {/* Preload critical hero images for faster LCP */}
        <link rel="preload" as="image" href="/vector-1.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/vector-2.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/vector-3.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/vector-4.png" fetchPriority="high" />
      </head>
      <body className="font-noto">
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
