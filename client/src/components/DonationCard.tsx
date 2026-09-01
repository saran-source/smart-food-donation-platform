import type { Donation } from '../types/donation';
import type { MatchCandidate } from '../services/matching';

interface DonationCardProps {
  donation: Donation;
  match?: MatchCandidate;
  onSelect?: (donation: Donation) => void;
}

export function DonationCard({ donation, match, onSelect }: DonationCardProps) {
  return (
    <article className="donation-card">
      <div className="donation-card__header">
        <span className="status-badge">{donation.status}</span>
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
      {onSelect && <button onClick={() => onSelect(donation)}>View donation</button>}
    </article>
  );
}
