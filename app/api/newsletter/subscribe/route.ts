/**
 * Newsletter Subscription API Route
 * Integrates with Mailchimp to subscribe users to newsletter
 * Sends double opt-in confirmation email automatically
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Get Mailchimp credentials from environment variables
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX; // e.g., 'us21'

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
      console.error('Mailchimp environment variables not configured');
      return NextResponse.json(
        { error: 'Newsletter service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Mailchimp API endpoint
    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

    // Prepare member data
    const memberData = {
      email_address: email,
      status: 'pending', // 'pending' triggers double opt-in confirmation email
      merge_fields: {
        ...(firstName && { FNAME: firstName }),
        ...(lastName && { LNAME: lastName }),
      },
      tags: ['Website Signup'], // Optional: tag for tracking source
    };

    // Make request to Mailchimp API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
      },
      body: JSON.stringify(memberData),
    });

    const data = await response.json();

    // Handle Mailchimp response
    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Please check your email to confirm your subscription!',
        email: email,
      });
    }

    // Handle already subscribed
    if (data.title === 'Member Exists') {
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed to our newsletter!',
        email: email,
      });
    }

    // Handle other errors
    console.error('Mailchimp API error:', data);
    return NextResponse.json(
      { 
        error: data.detail || 'Failed to subscribe. Please try again later.',
        mailchimpError: data.title 
      },
      { status: response.status }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
