import { useState } from 'react';
import { Link } from 'react-router-dom';
import { updatePickupStatus } from '../services/pickups';
import type { PickupStatus } from '../types/pickup';

interface DemoPickup {
  id: string;
  donation: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupTime: string;
  status: PickupStatus;
}

const demoPickup: DemoPickup = {
  id: 'demo-pickup',
  donation: '50 meal boxes',
  pickupAddress: 'Chennai, Tamil Nadu',
  deliveryAddress: 'Community Centre, Chennai',
  pickupTime: 'Today, 6:00 PM',
  status: 'ASSIGNED',
};

export function VolunteerDashboardPage() {
  const [pickup, setPickup] = useState(demoPickup);
  const [saving, setSaving] = useState(false);

  async function moveTo(status: PickupStatus) {
    setSaving(true);
    try {
      if (!pickup.id.startsWith('demo-')) await updatePickupStatus(pickup.id, status);
      setPickup((current) => ({ ...current, status }));
    } finally {
      setSaving(false);
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
          <p>Manage assigned food pickups and keep delivery status up to date.</p>
        </div>
        <Link className="primary-action" to="/dashboard">Back to dashboard</Link>
      </header>

      <article className="pickup-card">
        <span className="status-badge">{pickup.status.replace('_', ' ')}</span>
        <h2>{pickup.donation}</h2>
        <p><strong>Pickup:</strong> {pickup.pickupAddress}</p>
        <p><strong>Delivery:</strong> {pickup.deliveryAddress}</p>
        <p><strong>Time:</strong> {pickup.pickupTime}</p>
        {nextStatus[pickup.status] && (
          <button disabled={saving} onClick={() => void moveTo(nextStatus[pickup.status]!)}>
            {saving ? 'Updating…' : `Mark ${nextStatus[pickup.status]!.replace('_', ' ').toLowerCase()}`}
          </button>
        )}
      </article>
    </main>
  );
}
