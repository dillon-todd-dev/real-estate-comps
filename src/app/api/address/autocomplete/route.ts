import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API Key', data: null });
  }

  const { searchParams } = new URL(
    req.url,
    `http://${req.headers?.get('host')}`
  );

  const input = searchParams.get('input');
  console.log(`input: ${input}`);
  const url = 'https://places.googleapis.com/v1/places:autocomplete';

  const primaryTypes = [
    'street_address',
    'subpremise',
    'route',
    'street_number',
    'landmark',
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      body: JSON.stringify({
        input,
        includedPrimaryTypes: primaryTypes,
        includedRegionCodes: ['US'],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({ data: data.suggestions, error: null });
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return NextResponse.json({ error, data: null });
  }
}
