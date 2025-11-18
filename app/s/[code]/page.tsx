import { redirect } from 'next/navigation';
import { Redis } from '@upstash/redis';

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface PageProps {
  params: {
    code: string;
  };
}

export default async function ShortUrlRedirect({ params }: PageProps) {
  const { code } = params || {};

  let urlData: string | null = null;

  try {
    // Get URL from Redis using the received code
    if (code) {
      urlData = await redis.get<string>(code);
    }

    if (urlData) {
      // Redirect to the original URL
      redirect(urlData);
    }
  } catch (error) {
    console.error('Error retrieving short URL:', error);
    // Will fall through to diagnostics / 404 page below
  }

  // If URL not found or error, show diagnostics + 404 page
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-anek font-bold text-6xl text-[#FFD84D] mb-4">404</h1>
        <h2 className="font-anek font-bold text-2xl text-[#0b2540] mb-4">
          Short URL Not Found
        </h2>
        <p className="font-noto text-[#5a6c7d] mb-4">
          The short URL <span className="font-mono text-[#419372]">/s/{code ?? '(undefined)'}</span> does not exist or has expired.
        </p>

        {/* Diagnostics (temporary for debugging) */}
        <div className="mt-4 mb-8 text-left bg-[#FFF7E6] border border-[#FFE0A3] rounded-lg p-4 font-mono text-xs text-[#5a6c7d]">
          <div className="font-bold text-[#0b2540] mb-2">Debug Info (temporary)</div>
          <p><span className="font-semibold">params:</span> {JSON.stringify(params)}</p>
          <p><span className="font-semibold">code:</span> {String(code)}</p>
          <p><span className="font-semibold">redis.get(code):</span> {urlData === null ? 'null' : urlData || '(empty string)'}</p>
          <p><span className="font-semibold">REDIS_URL prefix:</span> {process.env.UPSTASH_REDIS_REST_URL?.slice(0, 40) ?? '(undefined)'}</p>
        </div>

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
