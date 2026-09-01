export const PICKUP_STATUSES = ['ASSIGNED', 'ACCEPTED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'] as const;
export type PickupStatus = (typeof PICKUP_STATUSES)[number];

export interface Pickup {
  id: string;
  donationId: string;
  donorId: string;
  ngoId: string;
  volunteerId?: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupTime: string;
  status: PickupStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}
