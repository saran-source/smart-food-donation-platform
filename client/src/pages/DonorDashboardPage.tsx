import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { calculateDonationStats } from '../services/donationStats';
import { subscribeToDonorDonations } from '../services/donationSubscriptions';
import type { Donation } from '../types/donation';

export function DonorDashboardPage() {
  const { profile, user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [error, setError] = useState('');
  const stats = calculateDonationStats(donations);

  useEffect(() => {
    if (!user) return;
    return subscribeToDonorDonations(user.uid, setDonations, (reason) => setError(reason.message));
  }, [user]);

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div><span className="eyebrow">DONOR WORKSPACE</span><h1>Welcome, {profile?.displayName ?? 'Donor'}</h1><p>Share surplus food and help it reach the right community.</p></div>
        <Link className="primary-action" to="/donations/new">+ Create donation</Link>
      </header>
      <section className="stats-grid">
        <article><span>Total donations</span><strong>{stats.total}</strong></article>
        <article><span>Active</span><strong>{stats.active}</strong></article>
        <article><span>Completed</span><strong>{stats.completed}</strong></article>
        <article><span>Meals shared</span><strong>{stats.meals}</strong></article>
      </section>
      {error && <p className="form-error" role="alert">Unable to load your donations: {error}</p>}
      <section className="empty-state">
        <h2>Your donations</h2>
        {donations.length === 0 ? <><p>No donations yet.</p><Link to="/donations/new">Create your first donation →</Link></> : (
          <div className="donation-list">{donations.map((donation) => <article key={donation.id} className="donation-card"><strong>{donation.title}</strong><span>{donation.quantity} {donation.unit} · {donation.status}</span></article>)}</div>
        )}
      </section>
    </main>
  );
}
