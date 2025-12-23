/**
 * Netlify Scheduled Function
 * Runs every 6 hours to cleanup blogs unpublished for 48+ hours
 * 
 * To enable: Deploy to Netlify, then configure in Netlify UI:
 * Functions -> scheduled-cleanup -> Add trigger -> Cron expression: 0 star/6 star star star
 * (Replace 'star' with asterisk symbol)
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const CLEANUP_SECRET = process.env.CLEANUP_SECRET || 'change-this-secret';
  const SITE_URL = process.env.URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${SITE_URL}/api/cms/cleanup`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLEANUP_SECRET}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Cleanup completed',
        ...result,
      }),
    };
  } catch (error) {
    console.error('Scheduled cleanup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Cleanup failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

export { handler };
