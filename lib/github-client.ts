/**
 * GitHub GraphQL API Client
 * Handles authentication, rate limiting, and GraphQL queries for Projects v2
 */

import type { RateLimitInfo } from '@/types/github-project';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

export class GitHubClient {
  private token?: string;
  private lastRateLimit?: RateLimitInfo;

  constructor(token?: string) {
    this.token = token;
  }

  /**
   * Execute a GraphQL query against GitHub API
   */
  async query<T = any>(query: string, variables?: Record<string, any>): Promise<{
    data: T;
    rateLimit: RateLimitInfo;
  }> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      // Extract rate limit info
      const rateLimit: RateLimitInfo = {
        limit: json.data?.rateLimit?.limit || 5000,
        remaining: json.data?.rateLimit?.remaining || 0,
        reset: json.data?.rateLimit?.resetAt 
          ? new Date(json.data.rateLimit.resetAt).getTime() / 1000
          : Date.now() / 1000 + 3600,
        used: json.data?.rateLimit?.used || 0,
      };

      this.lastRateLimit = rateLimit;

      if (json.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
      }

      return {
        data: json.data,
        rateLimit,
      };
    } catch (error) {
      console.error('GitHub API request failed:', error);
      throw error;
    }
  }

  /**
   * Get the last known rate limit info
   */
  getRateLimit(): RateLimitInfo | undefined {
    return this.lastRateLimit;
  }

  /**
   * Check if we're approaching rate limit (< 10% remaining)
   */
  isApproachingRateLimit(): boolean {
    if (!this.lastRateLimit) return false;
    const percentRemaining = (this.lastRateLimit.remaining / this.lastRateLimit.limit) * 100;
    return percentRemaining < 10;
  }

  /**
   * Calculate seconds until rate limit reset
   */
  getSecondsUntilReset(): number {
    if (!this.lastRateLimit) return 0;
    return Math.max(0, this.lastRateLimit.reset - Date.now() / 1000);
  }
}

/**
 * Create a GitHub client instance
 */
export function createGitHubClient(token?: string): GitHubClient {
  return new GitHubClient(token);
}
