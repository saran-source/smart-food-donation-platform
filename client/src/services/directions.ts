export function buildGoogleDirectionsUrl(origin: string, destination: string): string {
  const params = new URLSearchParams({
    api: '1',
    origin,
    destination,
    travelmode: 'driving',
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function buildDirectionsFromCoordinates(
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
): string {
  return buildGoogleDirectionsUrl(
    `${origin.latitude},${origin.longitude}`,
    `${destination.latitude},${destination.longitude}`,
  );
}
