import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

interface PageProps {
  params: {
    code: string;
  };
}

export default async function ShortUrlRedirect({ params }: PageProps) {
  const { code } = params;

  try {
    // Read from JSON file
    const filePath = path.join(process.cwd(), 'public', 'short-urls.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const urls = JSON.parse(data);
    const urlData = urls[code];

    if (urlData) {
      // Redirect to the original URL
      redirect(urlData);
    }
  } catch (error) {
    console.error('Error retrieving short URL:', error);
    // Will fall through to 404 page below
  }

  // If URL not found or error, show 404 page
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-anek font-bold text-6xl text-[#FFD84D] mb-4">404</h1>
        <h2 className="font-anek font-bold text-2xl text-[#0b2540] mb-4">
          Short URL Not Found
        </h2>
        <p className="font-noto text-[#5a6c7d] mb-8">
          The short URL <span className="font-mono text-[#419372]">/s/{code}</span> does not exist or has expired.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#419372] text-white font-anek font-medium rounded-lg hover:bg-[#357a5e] transition-colors"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  return {
    title: 'Redirecting... | Avni',
    robots: {
      index: false,
      follow: false,
    },
  };
}
