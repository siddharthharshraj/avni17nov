import { NextRequest, NextResponse } from 'next/server';

// Use Edge Runtime for Netlify Blobs compatibility
export const runtime = 'edge';

// Generate random 5-character code
function generateCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !url.startsWith('http')) {
      return NextResponse.json(
        { error: 'Invalid URL. Must start with http:// or https://' },
        { status: 400 }
      );
    }

    // Try to use Netlify Blobs if available
    try {
      const { getStore } = await import('@netlify/blobs');
      const store = getStore('short-urls');

      // Generate unique code
      let code = generateCode();
      let attempts = 0;
      
      // Ensure code is unique (check if it already exists)
      while (attempts < 10) {
        const existing = await store.get(code, { type: 'text' });
        if (!existing) break;
        code = generateCode();
        attempts++;
      }

      if (attempts >= 10) {
        return NextResponse.json(
          { error: 'Failed to generate unique code. Please try again.' },
          { status: 500 }
        );
      }

      // Store the mapping
      await store.set(code, url);

      // Get the current domain
      const host = request.headers.get('host') || 'avniproject.org';
      const protocol = host.includes('localhost') ? 'http' : 'https';
      const shortUrl = `${protocol}://${host}/s/${code}`;

      return NextResponse.json({
        success: true,
        code,
        shortUrl,
        originalUrl: url,
      });
    } catch (blobError) {
      // Netlify Blobs not available - return error with helpful message
      console.error('Netlify Blobs not available:', blobError);
      return NextResponse.json(
        { 
          error: 'URL shortener requires Netlify deployment. Please deploy to Netlify to use this feature.',
          details: 'This feature uses Netlify Blobs which is only available on Netlify servers.'
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Error creating short URL:', error);
    return NextResponse.json(
      { error: 'Failed to create short URL' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve URL by code (for testing)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: 'Code parameter is required' },
        { status: 400 }
      );
    }

    try {
      const { getStore } = await import('@netlify/blobs');
      const store = getStore('short-urls');
      const url = await store.get(code, { type: 'text' });

      if (!url) {
        return NextResponse.json(
          { error: 'Short URL not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        code,
        url,
      });
    } catch (blobError) {
      return NextResponse.json(
        { error: 'Netlify Blobs not available' },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Error retrieving short URL:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve short URL' },
      { status: 500 }
    );
  }
}
