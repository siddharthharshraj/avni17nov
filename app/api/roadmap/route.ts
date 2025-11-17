/**
 * GitHub Projects v2 API Route
 * Simple endpoint to fetch project board data
 * Caches for 48 hours to minimize API calls
 */

import { NextResponse } from 'next/server';
import { createGitHubClient } from '@/lib/github-client';
import { normalizeProjectData, fetchAllProjectItems } from '@/lib/normalize-project-data';
import type { ProjectAPIResponse } from '@/types/github-project';

// Cache duration: 48 hours
const CACHE_DURATION = 48 * 60 * 60 * 1000;

// In-memory cache
let cachedData: any = null;
let cacheTimestamp: number = 0;

export async function GET() {
  try {
    // Check cache
    const now = Date.now();
    if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('Returning cached project data');
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
        cacheAge: Math.floor((now - cacheTimestamp) / 1000),
      } as ProjectAPIResponse);
    }

    // Get environment variables
    const owner = process.env.GITHUB_OWNER || 'avniproject';
    const projectNumber = parseInt(process.env.GITHUB_PROJECT_NUMBER || '2');
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'GitHub token required. Please add GITHUB_TOKEN to your environment variables.',
          instructions: 'Visit https://github.com/settings/tokens to create a token with read:project scope',
        } as ProjectAPIResponse,
        { status: 401 }
      );
    }

    // Create GitHub client
    const client = createGitHubClient(token);

    // Fetch all project data with pagination
    const rawData = await fetchAllProjectItems(client, owner, projectNumber);

    // Normalize the data
    const normalizedData = normalizeProjectData(rawData);

    // Update cache
    cachedData = normalizedData;
    cacheTimestamp = now;

    // Get rate limit info
    const rateLimit = client.getRateLimit();

    return NextResponse.json({
      success: true,
      data: normalizedData,
      cached: false,
      rateLimit,
    } as ProjectAPIResponse);

  } catch (error: any) {
    console.error('Error fetching project data:', error);
    
    // Return cached data if available, even if stale
    if (cachedData) {
      console.log('Returning stale cached data due to error');
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
        stale: true,
        error: error.message,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch project data',
      } as ProjectAPIResponse,
      { status: 500 }
    );
  }
}
