/**
 * PreloadImages Component
 * Preloads critical hero images for faster initial load
 */

export default function PreloadImages() {
  return (
    <>
      {/* Preload critical hero images */}
      <link rel="preload" as="image" href="/vector-1.png" />
      <link rel="preload" as="image" href="/vector-2.png" />
      <link rel="preload" as="image" href="/vector-3.png" />
      <link rel="preload" as="image" href="/vector-4.png" />
    </>
  );
}
