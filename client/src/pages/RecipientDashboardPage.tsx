import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RecipientDashboardPage() {
  const { profile } = useAuth();

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">RECIPIENT WORKSPACE</span>
          <h1>Welcome, {profile?.displayName ?? 'Recipient'}</h1>
          <p>Request food support and follow your requests through fulfillment.</p>
        </div>
        <Link className="primary-action" to="/requests/new">Create food request</Link>
      </header>
      <section className="stats-grid">
        <article><span>Open requests</span><strong>—</strong></article>
        <article><span>Matched</span><strong>—</strong></article>
        <article><span>Fulfilled</span><strong>—</strong></article>
        <article><span>Meals received</span><strong>—</strong></article>
      </section>
    </main>
  );
}
