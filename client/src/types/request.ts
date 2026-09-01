export const REQUEST_STATUSES = ['OPEN', 'MATCHED', 'FULFILLED', 'CANCELLED'] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export interface FoodRequest {
  id: string;
  requesterId: string;
  foodType: string;
  quantity: number;
  unit: 'MEALS' | 'KG' | 'PACKETS' | 'BOXES';
  neededBy: string;
  deliveryAddress: string;
  latitude: number;
  longitude: number;
  status: RequestStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}
