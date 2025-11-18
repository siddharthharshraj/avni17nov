import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Generate random 5-character code
function generateCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Path to JSON file
const getFilePath = () => path.join(process.cwd(), 'public', 'short-urls.json');

// Read URLs from file
async function readUrls(): Promise<Record<string, string>> {
  try {
    const filePath = getFilePath();
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

// Write URLs to file
async function writeUrls(urls: Record<string, string>): Promise<void> {
  const filePath = getFilePath();
  await fs.writeFile(filePath, JSON.stringify(urls, null, 2), 'utf-8');
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

    // Read existing URLs
    const urls = await readUrls();

    // Generate unique code
    let code = generateCode();
    let attempts = 0;
    
    while (attempts < 10 && urls[code]) {
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
    urls[code] = url;
    await writeUrls(urls);

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

    const urls = await readUrls();
    const url = urls[code];

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
  } catch (error) {
    console.error('Error retrieving short URL:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve short URL' },
      { status: 500 }
    );
  }
}
