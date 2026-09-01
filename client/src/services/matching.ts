import type { Donation, FoodType } from '../types/donation';

export interface MatchCandidate {
  donation: Donation;
  distanceKm: number;
  score: number;
  reasons: string[];
}

const EARTH_RADIUS_KM = 6371;

export function calculateDistanceKm(
  from: { latitude: number; longitude: number },
  to: { latitude: number; longitude: number },
): number {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const latitudeDelta = toRadians(to.latitude - from.latitude);
  const longitudeDelta = toRadians(to.longitude - from.longitude);
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(longitudeDelta / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

function expiryScore(expiresAt: string): { score: number; reason?: string } {
  const hoursRemaining = (new Date(expiresAt).getTime() - Date.now()) / 3_600_000;
  if (hoursRemaining <= 0) return { score: 0 };
  if (hoursRemaining <= 1) return { score: 40, reason: 'Expires within 1 hour' };
  if (hoursRemaining <= 3) return { score: 30, reason: 'Expires within 3 hours' };
  if (hoursRemaining <= 6) return { score: 20, reason: 'Expires within 6 hours' };
  return { score: 10 };
}

export function rankDonationMatches(
  donations: Donation[],
  recipientLocation: { latitude: number; longitude: number },
  preferences?: { foodType?: FoodType; minimumQuantity?: number; maxDistanceKm?: number },
): MatchCandidate[] {
  return donations
    .filter((donation) => donation.status === 'AVAILABLE')
    .map((donation) => {
      const distanceKm = calculateDistanceKm(recipientLocation, donation.location);
      const reasons: string[] = [];
      let score = Math.max(0, 40 - distanceKm * 4);

      if (preferences?.maxDistanceKm !== undefined && distanceKm > preferences.maxDistanceKm) {
        score -= 100;
      } else if (distanceKm <= 2) {
        reasons.push('Very close');
      } else if (distanceKm <= 5) {
        reasons.push('Nearby');
      }

      if (preferences?.foodType && donation.foodType === preferences.foodType) {
        score += 25;
        reasons.push('Food type matches');
      }

      if (preferences?.minimumQuantity && donation.quantity >= preferences.minimumQuantity) {
        score += 20;
        reasons.push('Quantity meets need');
      }

      const urgency = expiryScore(donation.expiresAt);
      score += urgency.score;
      if (urgency.reason) reasons.push(urgency.reason);

      return { donation, distanceKm, score, reasons };
    })
    .filter((candidate) => candidate.score >= 0)
    .sort((a, b) => b.score - a.score);
}
