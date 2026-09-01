import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Pickup, PickupStatus } from '../types/pickup';

export interface CreatePickupInput {
  donationId: string;
  donorId: string;
  ngoId: string;
  volunteerId?: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupTime: string;
}

export async function createPickup(input: CreatePickupInput): Promise<string> {
  const reference = await addDoc(collection(db, 'pickups'), {
    ...input,
    status: 'ASSIGNED',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return reference.id;
}

export async function updatePickupStatus(pickupId: string, status: PickupStatus): Promise<void> {
  await updateDoc(doc(db, 'pickups', pickupId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function assignVolunteer(pickupId: string, volunteerId: string): Promise<void> {
  await updateDoc(doc(db, 'pickups', pickupId), {
    volunteerId,
    status: 'ASSIGNED',
    updatedAt: serverTimestamp(),
  });
}
