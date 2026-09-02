import { useEffect, useRef, useState } from 'react';
import { configureGoogleMaps, importLibrary } from '../services/maps';
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
    let marker: any;

    async function loadMap() {
      try {
        configureGoogleMaps();
        const { Map } = await importLibrary('maps');
        const { Marker } = await importLibrary('marker');
        const center = value
          ? { lat: value.latitude, lng: value.longitude }
          : { lat: 13.0827, lng: 80.2707 };

        if (cancelled || !mapElement.current) return;
        const map = new Map(mapElement.current, {
          center,
          zoom: 12,
        });

        marker = new Marker({
          map,
          position: center,
          draggable: true,
        });

        marker.addListener('dragend', () => {
          const position = marker?.getPosition();
          if (!position) return;
          onChange({
            latitude: position.lat(),
            longitude: position.lng(),
            address: value?.address ?? 'Selected map location',
          });
        });

        map.addListener('click', (event) => {
          if (!event.latLng || !marker) return;
          const latitude = event.latLng.lat();
          const longitude = event.latLng.lng();
          marker.setPosition({ lat: latitude, lng: longitude });
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
    return () => {
      cancelled = true;
      marker?.setMap(null);
    };
  }, [onChange, value]);

  return (
    <div>
      <div ref={mapElement} style={{ height: 320, width: '100%', borderRadius: 16 }} />
      {value && <p>Selected: {value.latitude.toFixed(5)}, {value.longitude.toFixed(5)}</p>}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
