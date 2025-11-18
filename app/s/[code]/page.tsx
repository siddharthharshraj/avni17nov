import { headers } from 'next/headers';
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
  // On Netlify, params can be empty ({}). Derive code from request URL as fallback.
  let code = params?.code as string | undefined;

  if (!code) {
    const h = await headers();
    const rawUrl =
      h.get('x-nf-request-url') ||
      h.get('x-forwarded-url') ||
      undefined;

    if (rawUrl) {
      try {
        const url = new URL(rawUrl);
        const segments = url.pathname.split('/').filter(Boolean);
        // Expecting /s/{code}
        if (segments[0] === 's' && segments[1]) {
          code = segments[1];
        }
      } catch (e) {
        console.error('Error parsing request URL for short code:', e);
      }
    }
  }

  try {
    if (code) {
      const urlData = await redis.get<string>(code);
      if (urlData) {
        redirect(urlData);
      }
    }
  } catch (error) {
    console.error('Error retrieving short URL:', error);
  }

  // If URL not found or error, show clean 404 page
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-anek font-bold text-6xl text-[#FFD84D] mb-4">404</h1>
        <h2 className="font-anek font-bold text-2xl text-[#0b2540] mb-4">
          Short URL Not Found
        </h2>
        <p className="font-noto text-[#5a6c7d] mb-8">
          The short URL <span className="font-mono text-[#419372]">/s/{code ?? ''}</span> does not exist or has expired.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#419372] text-white font-anek font-medium rounded-lg hover:bg-[#357a5e] transition-colors"
        >
           Back to Home
        </a>
      </div>
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata() {
  return {
    title: 'Redirecting... | Avni',
    robots: {
      index: false,
      follow: false,
    },
  };
}
