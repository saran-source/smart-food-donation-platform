import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { CreateDonationInput, DonationStatus } from '../types/donation';

const donationsCollection = collection(db, 'donations');

export async function createDonation(input: CreateDonationInput): Promise<string> {
  const reference = await addDoc(donationsCollection, {
    ...input,
    status: 'AVAILABLE',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return reference.id;
}

export async function updateDonationStatus(id: string, status: DonationStatus) {
  await updateDoc(doc(db, 'donations', id), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export function donationsQuery() {
  return query(donationsCollection, orderBy('createdAt', 'desc'));
}
