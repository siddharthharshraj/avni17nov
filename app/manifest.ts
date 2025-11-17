import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Avni - Digital Platform for NGO Field Operations',
    short_name: 'Avni',
    description: 'Empowering NGOs with simple, sustainable digital tools for field operations, data collection, and impact measurement.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#419372',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['productivity', 'business', 'social'],
    lang: 'en',
    orientation: 'portrait-primary',
  };
}
