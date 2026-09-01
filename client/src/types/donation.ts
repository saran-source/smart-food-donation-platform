export const DONATION_STATUSES = ['AVAILABLE', 'CLAIMED', 'PICKUP_ASSIGNED', 'PICKED_UP', 'DELIVERED', 'COMPLETED', 'EXPIRED', 'CANCELLED'] as const;
export type DonationStatus = (typeof DONATION_STATUSES)[number];

export const FOOD_TYPES = ['VEGETARIAN', 'NON_VEGETARIAN', 'VEGAN', 'BAKERY', 'FRUITS', 'PACKAGED', 'OTHER'] as const;
export type FoodType = (typeof FOOD_TYPES)[number];

export interface GeoPointData {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Donation {
  id: string;
  donorId: string;
  title: string;
  description: string;
  foodType: FoodType;
  quantity: number;
  unit: 'MEALS' | 'KG' | 'PACKETS' | 'BOXES';
  preparedAt: string;
  expiresAt: string;
  pickupStart: string;
  pickupEnd: string;
  location: GeoPointData;
  status: DonationStatus;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDonationInput {
  donorId: string;
  title: string;
  description: string;
  foodType: FoodType;
  quantity: number;
  unit: Donation['unit'];
  preparedAt: string;
  expiresAt: string;
  pickupStart: string;
  pickupEnd: string;
  location: GeoPointData;
  imageUrl?: string;
}
