import { useState } from 'react';
import { claimDonation } from '../services/claims';

interface ClaimDonationButtonProps {
  donationId: string;
  ngoId: string;
  onClaimed?: () => void;
}

export function ClaimDonationButton({ donationId, ngoId, onClaimed }: ClaimDonationButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleClaim() {
    setLoading(true);
    setError('');
    try {
      await claimDonation(donationId, ngoId);
      onClaimed?.();
    } catch (claimError) {
      setError(claimError instanceof Error ? claimError.message : 'Unable to claim donation.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={() => void handleClaim()} disabled={loading}>
        {loading ? 'Claiming…' : 'Claim donation'}
      </button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  );
}
