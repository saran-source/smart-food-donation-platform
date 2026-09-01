import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeToVolunteerPickups, updatePickupStatus } from '../services/pickups';
import { useAuth } from '../context/AuthContext';
import type { PickupStatus } from '../types/pickup';
import type { Pickup } from '../services/pickups';

export function VolunteerDashboardPage() {
  const { user } = useAuth();
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    return subscribeToVolunteerPickups(user.uid, setPickups);
  }, [user]);

  async function moveTo(pickupId: string, status: PickupStatus) {
    setSavingId(pickupId);
    try {
      await updatePickupStatus(pickupId, status);
    } finally {
      setSavingId(null);
    }
  }

  const nextStatus: Partial<Record<PickupStatus, PickupStatus>> = {
    ASSIGNED: 'ACCEPTED',
    ACCEPTED: 'PICKED_UP',
    PICKED_UP: 'IN_TRANSIT',
    IN_TRANSIT: 'DELIVERED',
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">VOLUNTEER WORKSPACE</span>
          <h1>My pickups</h1>
          <p>Live assignments from Firestore.</p>
        </div>
        <Link className="primary-action" to="/dashboard">Back to dashboard</Link>
      </header>

      {pickups.length === 0 ? (
        <section className="empty-state"><h2>No assigned pickups</h2><p>New assignments will appear here automatically.</p></section>
      ) : pickups.map((pickup) => {
        const next = nextStatus[pickup.status];
        return (
          <article className="pickup-card" key={pickup.id}>
            <span className="status-badge">{pickup.status.replace('_', ' ')}</span>
            <h2>Donation #{pickup.donationId.slice(0, 8)}</h2>
            <p><strong>Pickup:</strong> {pickup.pickupAddress}</p>
            <p><strong>Delivery:</strong> {pickup.deliveryAddress}</p>
            {next && (
              <button disabled={savingId === pickup.id} onClick={() => void moveTo(pickup.id, next)}>
                {savingId === pickup.id ? 'Updating…' : `Mark ${next.replace('_', ' ').toLowerCase()}`}
              </button>
            )}
          </article>
        );
      })}
    </main>
  );
}
