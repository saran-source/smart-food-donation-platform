import type { Donation } from './donation';

export interface MatchingProfile {
  latitude: number;
  longitude: number;
  preferredFoodTypes?: Donation['foodType'][];
  requiredQuantity?: number;
  maxDistanceKm?: number;
}

export interface DonationMatch {
  donation: Donation;
  distanceKm: number;
  score: number;
  reasons: string[];
}
