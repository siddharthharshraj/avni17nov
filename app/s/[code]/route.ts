import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  console.log('=== SHORT URL DEBUG ===');
  console.log('Code received:', code);
  console.log('Redis URL configured:', !!process.env.UPSTASH_REDIS_REST_URL);
  console.log('Redis Token configured:', !!process.env.UPSTASH_REDIS_REST_TOKEN);

  if (!code) {
    console.log('No code provided, redirecting to home');
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    console.log('Looking up code in Redis...');
    const url = await redis.get<string>(code);
    console.log('Redis result:', url);

    if (url && typeof url === 'string') {
      console.log('Found URL, redirecting to:', url);
      // 302 redirect to the original long URL
      return NextResponse.redirect(url, 302);
    } else {
      console.log('URL not found in Redis, redirecting to home');
    }
  } catch (error) {
    console.error('Error retrieving short URL:', error);
  }

  // Not found - redirect to home
  return NextResponse.redirect(new URL('/', request.url));
}
