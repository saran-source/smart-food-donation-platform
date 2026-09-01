import { useEffect, useMemo, useState } from 'react';
import { DonationCard } from '../components/DonationCard';
import { subscribeToAvailableDonations } from '../services/donationSubscriptions';
import { rankDonationMatches } from '../services/matching';
import type { Donation, FoodType } from '../types/donation';

export function NearbyDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [foodType, setFoodType] = useState<FoodType | ''>('');
  const [minimumQuantity, setMinimumQuantity] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => subscribeToAvailableDonations(setDonations, (reason) => setError(reason.message)), []);

  const matches = useMemo(() => rankDonationMatches(
    donations,
    { latitude: 13.0827, longitude: 80.2707 },
    { foodType: foodType || undefined, minimumQuantity: minimumQuantity || undefined, maxDistanceKm: 50 },
  ), [donations, foodType, minimumQuantity]);

  return (
    <main className="app-shell">
      <section className="dashboard-card">
        <span className="eyebrow">SMART MATCHING</span>
        <h1>Nearby donations</h1>
        <p>Live Firestore donations are ranked by distance, preference, quantity, and expiry urgency.</p>
        <div className="filters">
          <label>Food type<select value={foodType} onChange={(e) => setFoodType(e.target.value as FoodType | '')}>
            <option value="">Any type</option><option value="VEGETARIAN">Vegetarian</option><option value="VEGAN">Vegan</option>
            <option value="NON_VEGETARIAN">Non-vegetarian</option><option value="BAKERY">Bakery</option><option value="FRUITS">Fruits</option><option value="PACKAGED">Packaged</option>
          </select></label>
          <label>Minimum quantity<input type="number" min="0" value={minimumQuantity} onChange={(e) => setMinimumQuantity(Number(e.target.value))} /></label>
        </div>
        {error && <p className="form-error" role="alert">Unable to load donations: {error}</p>}
        <div className="donation-list">
          {matches.map((match) => <DonationCard key={match.donation.id} donation={match.donation} match={match} />)}
          {!matches.length && !error && <p>No available matching donations yet.</p>}
        </div>
      </section>
    </main>
  );
}
