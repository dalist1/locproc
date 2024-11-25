'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapDisplay({ location }: { location: { lat: number; lng: number } | null }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [19.145136, 51.919438],
      zoom: 6,
      language: 'pl'
    });
    return () => mapRef.current?.remove();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !location) return;
    markerRef.current?.remove();
    markerRef.current = new mapboxgl.Marker()
      .setLngLat([location.lng, location.lat])
      .addTo(mapRef.current);
    mapRef.current.flyTo({ center: [location.lng, location.lat], zoom: 15, essential: true });
  }, [location]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
