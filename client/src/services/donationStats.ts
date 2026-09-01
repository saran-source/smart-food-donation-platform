import type { Donation } from '../types/donation';

export interface DonationStats {
  total: number;
  active: number;
  completed: number;
  meals: number;
}

export function calculateDonationStats(donations: Donation[]): DonationStats {
  return donations.reduce<DonationStats>((stats, donation) => {
    stats.total += 1;
    if (['AVAILABLE', 'CLAIMED', 'PICKUP_ASSIGNED', 'PICKED_UP'].includes(donation.status)) {
      stats.active += 1;
    }
    if (donation.status === 'COMPLETED') stats.completed += 1;
    if (donation.unit === 'MEALS') stats.meals += donation.quantity;
    return stats;
  }, { total: 0, active: 0, completed: 0, meals: 0 });
}
