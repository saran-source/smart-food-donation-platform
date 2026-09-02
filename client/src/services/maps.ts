import { importLibrary, setOptions } from '@googlemaps/js-api-loader';

let configured = false;

export function configureGoogleMaps() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error('VITE_GOOGLE_MAPS_API_KEY is not configured.');

  if (!configured) {
    setOptions({ apiKey, version: 'weekly' });
    configured = true;
  }
}

export { importLibrary };
