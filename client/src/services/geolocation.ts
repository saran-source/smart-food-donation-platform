export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export const DEFAULT_LOCATION: Coordinates = {
  latitude: 13.0827,
  longitude: 80.2707,
  accuracy: 50000,
};

export function getCurrentLocation(options?: PositionOptions): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
      }),
      (error) => reject(error),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000, ...options },
    );
  });
}
