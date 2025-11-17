/**
 * Media Gallery Page
 * Displays field photos and videos with tabs
 */

import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MediaGalleryClient from '@/components/media-gallery/MediaGalleryClient';

export const metadata: Metadata = {
  title: 'Media Gallery | Avni',
  description: 'Explore field photos and videos showcasing Avni in action across various implementations.',
};

export default function MediaGalleryPage() {
  return (
    <>
      <Header />
      <MediaGalleryClient />
      <Footer />
    </>
  );
}
