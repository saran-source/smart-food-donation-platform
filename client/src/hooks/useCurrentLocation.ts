import { useEffect, useState } from 'react';
import { DEFAULT_LOCATION, getCurrentLocation, type Coordinates } from '../services/geolocation';

export function useCurrentLocation() {
  const [location, setLocation] = useState<Coordinates>(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    void getCurrentLocation()
      .then((coordinates) => {
        if (active) setLocation(coordinates);
      })
      .catch((reason: unknown) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : 'Unable to determine your location.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { location, loading, error };
}
