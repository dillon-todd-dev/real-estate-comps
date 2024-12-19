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

  const placeId = searchParams.get('placeId');
  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': '*',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

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
  } catch (error) {
    console.error('Error fetching place details:', error);
    return NextResponse.json({ error: error, data: null });
  }
}
