import { useMemo } from 'react';
import type { Donation } from '../types/donation';
import type { MatchCandidate } from '../services/matching';

interface DonationMapProps {
  donations: MatchCandidate[];
  center?: { latitude: number; longitude: number };
  onSelect?: (donation: Donation) => void;
}

export function DonationMap({ donations, center = { latitude: 13.0827, longitude: 80.2707 }, onSelect }: DonationMapProps) {
  const mapsUrl = useMemo(() => {
    const destination = `${center.latitude},${center.longitude}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
  }, [center]);

  return (
    <section className="donation-map" aria-label="Donation locations">
      <div className="map-placeholder">
        <div>
          <span className="eyebrow">MAP VIEW</span>
          <h2>{donations.length} nearby donation{donations.length === 1 ? '' : 's'}</h2>
          <p>Google Maps integration is ready for the browser API key.</p>
          <a href={mapsUrl} target="_blank" rel="noreferrer">Open area in Google Maps</a>
        </div>
      </div>
      <div className="map-list">
        {donations.slice(0, 5).map(({ donation, distanceKm }) => (
          <button key={donation.id} onClick={() => onSelect?.(donation)}>
            <strong>{donation.title}</strong>
            <span>{distanceKm.toFixed(1)} km away</span>
          </button>
        ))}
      </div>
    </section>
  );
}
