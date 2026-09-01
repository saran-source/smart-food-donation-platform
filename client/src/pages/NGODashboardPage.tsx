import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { rankDonationMatches } from '../services/matching';
import type { Donation } from '../types/donation';

const demoDonations: Donation[] = [];

export function NGODashboardPage() {
  const { profile } = useAuth();
  const matches = useMemo(() => rankDonationMatches(demoDonations, { latitude: 13.0827, longitude: 80.2707 }), []);

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">NGO WORKSPACE</span>
          <h1>Welcome, {profile?.displayName ?? 'Organization'}</h1>
          <p>Discover available food donations and prioritize the best matches.</p>
        </div>
        <Link className="primary-action" to="/nearby">Explore donations</Link>
      </header>
      <section className="empty-state">
        <h2>Smart matches</h2>
        <p>{matches.length ? `${matches.length} donation matches found.` : 'No live donations yet. Once Firebase is connected, available donations will appear here ranked by distance, food type, quantity, and expiry urgency.'}</p>
      </section>
    </main>
  );
}
