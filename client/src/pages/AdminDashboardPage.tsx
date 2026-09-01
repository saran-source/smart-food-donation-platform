import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function AdminDashboardPage() {
  const { profile } = useAuth();

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">ADMIN CONSOLE</span>
          <h1>Platform overview</h1>
          <p>Monitor users, donations, requests, pickups and operational activity.</p>
        </div>
        <Link className="primary-action" to="/dashboard">Workspace</Link>
      </header>
      <section className="stats-grid">
        <article><span>Users</span><strong>—</strong></article>
        <article><span>Donations</span><strong>—</strong></article>
        <article><span>Requests</span><strong>—</strong></article>
        <article><span>Pickups</span><strong>—</strong></article>
      </section>
      <section className="empty-state">
        <h2>Administration</h2>
        <p>Live operational metrics and moderation tools will be connected to Firestore next.</p>
      </section>
    </main>
  );
}
