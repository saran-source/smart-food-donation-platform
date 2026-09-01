import { Loader } from '@googlemaps/js-api-loader';

let loader: Loader | null = null;

export function getGoogleMapsLoader() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error('VITE_GOOGLE_MAPS_API_KEY is not configured.');

  if (!loader) {
    loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    });
  }

  return loader;
}
