import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Avni",
  description: "Clear, concise guidance to help you understand Avni's features, setup, and best practices. Find answers to common questions about our offline-first data collection platform.",
  keywords: [
    "Avni FAQ",
    "Frequently Asked Questions",
    "Avni Help",
    "Data Collection Questions",
    "NGO Software FAQ",
    "Avni Support",
    "Getting Started with Avni",
    "Avni Features",
    "Avni Pricing",
    "Technical Support"
  ],
  openGraph: {
    title: "FAQ - Frequently Asked Questions | Avni",
    description: "Clear, concise guidance to help you understand Avni's features, setup, and best practices.",
    type: "website",
    url: "https://avniproject.org/resources/faq",
    siteName: "Avni",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Frequently Asked Questions | Avni",
    description: "Clear, concise guidance to help you understand Avni's features, setup, and best practices.",
  },
  alternates: {
    canonical: "https://avniproject.org/resources/faq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
