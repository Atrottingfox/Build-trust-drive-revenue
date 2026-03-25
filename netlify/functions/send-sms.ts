// SMS delivery via Twilio REST API (no SDK dependency)
// Environment variables required: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'SMS service not configured' }),
    };
  }

  try {
    const { phone, message, resultsUrl } = JSON.parse(event.body || '{}');

    if (!phone || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Phone and message are required' }),
      };
    }

    const smsBody = resultsUrl
      ? `${message}\n\nView your full results: ${resultsUrl}`
      : message;

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');

    const formData = new URLSearchParams({
      To: phone,
      From: TWILIO_PHONE_NUMBER,
      Body: smsBody,
    });

    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Twilio error:', errorData);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to send SMS' }),
      };
    }

    const result = await response.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, sid: result.sid }),
    };
  } catch (err) {
    console.error('SMS error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
