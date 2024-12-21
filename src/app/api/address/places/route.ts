import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API Key', data: null });
  }

  const { searchParams } = new URL(
    req.url,
    `http://${req.headers?.get('host')}`,
  );

  const placeId = searchParams.get('placeId');
  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  const response = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': '*',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error('Error fetching place details:');
    return NextResponse.json({ error: null, data: null });
  }

  const data = await response.json();

  const dataFinderRegex = (c: string) => {
    const regex = new RegExp(`<span class="${c}">([^<]+)<\/span>`);
    const match = data.adrFormatAddress.match(regex);
    return match ? match[1] : '';
  };

  const street = dataFinderRegex('street-address');
  const city = dataFinderRegex('locality');
  const state = dataFinderRegex('region');
  const postalCode = dataFinderRegex('postal-code');

  const formattedData = { street, city, state, postalCode };

  return NextResponse.json({ data: { address: formattedData }, error: null });
}
