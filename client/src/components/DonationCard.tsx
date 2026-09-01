import { useState } from 'react';
import type { Donation } from '../types/donation';
import type { MatchCandidate } from '../services/matching';
import { claimAndCreatePickup } from '../services/claimAndPickup';
import { useAuth } from '../context/AuthContext';

interface DonationCardProps {
  donation: Donation;
  match?: MatchCandidate;
  onSelect?: (donation: Donation) => void;
}

export function DonationCard({ donation, match, onSelect }: DonationCardProps) {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [claimed, setClaimed] = useState(false);

  async function handleClaim() {
    if (!user || profile?.role !== 'NGO') return;
    setLoading(true);
    setError('');
    try {
      await claimAndCreatePickup({
        donationId: donation.id,
        ngoId: user.uid,
        deliveryAddress: profile.address || 'NGO delivery location',
      });
      setClaimed(true);
    } catch (claimError) {
      setError(claimError instanceof Error ? claimError.message : 'Unable to claim donation.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="donation-card">
      <div className="donation-card__header">
        <span className="status-badge">{claimed ? 'PICKUP ASSIGNED' : donation.status}</span>
        {match && <strong>{Math.round(match.score)} match</strong>}
      </div>
      <h3>{donation.title}</h3>
      <p>{donation.description || 'No description provided.'}</p>
      <div className="donation-meta">
        <span>{donation.quantity} {donation.unit.toLowerCase()}</span>
        <span>{donation.foodType.replace('_', ' ').toLowerCase()}</span>
        {match && <span>{match.distanceKm.toFixed(1)} km away</span>}
      </div>
      {match?.reasons.length ? (
        <ul className="match-reasons">
          {match.reasons.slice(0, 3).map((reason) => <li key={reason}>{reason}</li>)}
        </ul>
      ) : null}
      {profile?.role === 'NGO' && donation.status === 'AVAILABLE' && !claimed && (
        <button disabled={loading} onClick={() => void handleClaim()}>
          {loading ? 'Claiming…' : 'Claim & arrange pickup'}
        </button>
      )}
      {error && <p className="form-error" role="alert">{error}</p>}
      {onSelect && <button onClick={() => onSelect(donation)}>View donation</button>}
    </article>
  );
}
