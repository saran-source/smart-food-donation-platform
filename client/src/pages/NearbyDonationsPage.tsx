import { useMemo, useState } from 'react';
import { DonationCard } from '../components/DonationCard';
import { rankDonationMatches } from '../services/matching';
import type { Donation, FoodType } from '../types/donation';

const demoDonations: Donation[] = [
  {
    id: 'demo-1', donorId: 'demo-donor-1', title: 'Fresh meal boxes', description: 'Freshly prepared vegetarian meals.',
    foodType: 'VEGETARIAN', quantity: 50, unit: 'MEALS', preparedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 2 * 3_600_000).toISOString(), pickupStart: new Date().toISOString(),
    pickupEnd: new Date(Date.now() + 2 * 3_600_000).toISOString(), location: { latitude: 13.0827, longitude: 80.2707, address: 'Chennai, Tamil Nadu' },
    status: 'AVAILABLE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-2', donorId: 'demo-donor-2', title: 'Bakery surplus', description: 'Packaged bakery items from today.',
    foodType: 'BAKERY', quantity: 25, unit: 'BOXES', preparedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 6 * 3_600_000).toISOString(), pickupStart: new Date().toISOString(),
    pickupEnd: new Date(Date.now() + 5 * 3_600_000).toISOString(), location: { latitude: 13.0674, longitude: 80.2376, address: 'T Nagar, Chennai' },
    status: 'AVAILABLE', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

export function NearbyDonationsPage() {
  const [foodType, setFoodType] = useState<FoodType | ''>('');
  const [minimumQuantity, setMinimumQuantity] = useState(0);

  const matches = useMemo(() => rankDonationMatches(
    demoDonations,
    { latitude: 13.0827, longitude: 80.2707 },
    { foodType: foodType || undefined, minimumQuantity: minimumQuantity || undefined, maxDistanceKm: 50 },
  ), [foodType, minimumQuantity]);

  return (
    <main className="app-shell">
      <section className="dashboard-card">
        <span className="eyebrow">SMART MATCHING</span>
        <h1>Nearby donations</h1>
        <p>Donations are ranked using distance, food preference, quantity, and expiry urgency.</p>
        <div className="filters">
          <label>Food type<select value={foodType} onChange={(e) => setFoodType(e.target.value as FoodType | '')}>
            <option value="">Any type</option>
            <option value="VEGETARIAN">Vegetarian</option>
            <option value="VEGAN">Vegan</option>
            <option value="NON_VEGETARIAN">Non-vegetarian</option>
            <option value="BAKERY">Bakery</option>
            <option value="FRUITS">Fruits</option>
            <option value="PACKAGED">Packaged</option>
          </select></label>
          <label>Minimum quantity<input type="number" min="0" value={minimumQuantity} onChange={(e) => setMinimumQuantity(Number(e.target.value))} /></label>
        </div>
        <div className="donation-list">
          {matches.map((match) => <DonationCard key={match.donation.id} donation={match.donation} match={match} />)}
          {!matches.length && <p>No matching donations found.</p>}
        </div>
      </section>
    </main>
  );
}
