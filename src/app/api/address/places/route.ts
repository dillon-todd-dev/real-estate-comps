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

  const findAddressPart = (str: string) => {
    const addressPart = data.addressComponents.find((addressComponent: any) => {
      if (addressComponent.types.includes(str)) {
        return addressComponent;
      }
    });

    return addressPart?.longText ?? '';
  };

  const streetNum = findAddressPart('street_number');
  const streetName = findAddressPart('route');
  const city = findAddressPart('locality');
  const state = findAddressPart('administrative_area_level_1');
  const postalCodePrefix = findAddressPart('postal_code');
  const postalCodeSuffix = findAddressPart('postal_code_suffix');

  const postalCode = postalCodeSuffix
    ? `${postalCodePrefix}-${postalCodeSuffix}`
    : postalCodePrefix;

  const formattedData = {
    street: `${streetNum} ${streetName}`,
    city,
    state,
    postalCode,
  };

  return NextResponse.json({ data: { address: formattedData }, error: null });
}
