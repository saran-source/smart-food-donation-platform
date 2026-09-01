import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { calculateDonationStats } from '../services/donationStats';
import type { Donation } from '../types/donation';

const demoDonations: Donation[] = [];

export function DonorDashboardPage() {
  const { profile } = useAuth();
  const stats = calculateDonationStats(demoDonations);

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">DONOR WORKSPACE</span>
          <h1>Welcome, {profile?.displayName ?? 'Donor'}</h1>
          <p>Share surplus food and help it reach the right community.</p>
        </div>
        <Link className="primary-action" to="/donations/new">+ Create donation</Link>
      </header>

      <section className="stats-grid">
        <article><span>Total donations</span><strong>{stats.total}</strong></article>
        <article><span>Active</span><strong>{stats.active}</strong></article>
        <article><span>Completed</span><strong>{stats.completed}</strong></article>
        <article><span>Meals shared</span><strong>{stats.meals}</strong></article>
      </section>

      <section className="empty-state">
        <h2>Your donations</h2>
        <p>Your live donation history will appear here once Firebase is connected.</p>
        <Link to="/donations/new">Create your first donation →</Link>
      </section>
    </main>
  );
}
