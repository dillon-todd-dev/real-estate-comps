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

  const photoName = searchParams.get('photoName');
  const url = `https://places.googleapis.com/v1/${photoName}/media?key=${apiKey}`;
}
