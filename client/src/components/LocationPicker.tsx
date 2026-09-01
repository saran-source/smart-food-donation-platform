import { useEffect, useRef, useState } from 'react';
import { getGoogleMapsLoader } from '../services/maps';
import type { GeoPointData } from '../types/donation';

interface LocationPickerProps {
  value: GeoPointData | null;
  onChange: (location: GeoPointData) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    let marker: google.maps.marker.AdvancedMarkerElement | undefined;

    async function loadMap() {
      try {
        const loader = getGoogleMapsLoader();
        const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;
        const center = value ? { lat: value.latitude, lng: value.longitude } : { lat: 13.0827, lng: 80.2707 };

        if (cancelled || !mapElement.current) return;
        const map = new Map(mapElement.current, {
          center,
          zoom: 12,
          mapId: 'FOOD_DONATION_MAP',
        });

        marker = new AdvancedMarkerElement({ map, position: center, gmpDraggable: true });
        marker.addListener('dragend', () => {
          const position = marker?.position;
          if (!position || typeof position.lat !== 'number' || typeof position.lng !== 'number') return;
          onChange({
            latitude: position.lat,
            longitude: position.lng,
            address: value?.address ?? 'Selected map location',
          });
        });

        map.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (!event.latLng) return;
          const latitude = event.latLng.lat();
          const longitude = event.latLng.lng();
          marker!.position = { lat: latitude, lng: longitude };
          onChange({
            latitude,
            longitude,
            address: value?.address ?? 'Selected map location',
          });
        });
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Google Maps could not be loaded.');
      }
    }

    void loadMap();
    return () => { cancelled = true; marker?.map && (marker.map = null); };
  }, [onChange, value]);

  return (
    <div>
      <div ref={mapElement} style={{ height: 320, width: '100%', borderRadius: 16 }} />
      {value && <p>Selected: {value.latitude.toFixed(5)}, {value.longitude.toFixed(5)}</p>}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
