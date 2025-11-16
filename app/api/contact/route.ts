/**
 * Contact Form API Route
 * Handles sending contact form submissions via Formspree
 * Free forever, no maintenance required, no Cloudflare issues
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get Formspree form ID from environment
    const formspreeId = process.env.FORMSPREE_FORM_ID;
    
    if (!formspreeId) {
      console.error('FORMSPREE_FORM_ID is not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please add FORMSPREE_FORM_ID to environment variables.' },
        { status: 500 }
      );
    }

    // Formspree endpoint
    const formspreeEndpoint = `https://formspree.io/f/${formspreeId}`;
    
    // Prepare form data
    const formData = {
      name: name,
      email: email,
      message: message,
      _subject: 'Contact Us Submission from Avni Website',
      _replyto: email,
    };

    // Send to Formspree
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Formspree error:', result);
      return NextResponse.json(
        { error: result.error || 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
