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

  if (!code) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const url = await redis.get<string>(code);

    if (url && typeof url === 'string') {
      // 302 redirect to the original long URL
      return NextResponse.redirect(url, 302);
    }
  } catch (error) {
    console.error('Error retrieving short URL:', error);
  }

  // Not found - redirect to home
  return NextResponse.redirect(new URL('/', request.url));
}
