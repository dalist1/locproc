import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { address } = await request.json();
    
    const formattedAddress = address.trim();
    const encodedAddress = encodeURIComponent(formattedAddress);
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!token) {
      throw new Error('Mapbox token not configured');
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${token}&limit=5&types=address&language=pl&country=PL`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.features?.length) {
      return NextResponse.json({ error: 'No locations found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Geocoding failed' }, 
      { status: 500 }
    );
  }
}
