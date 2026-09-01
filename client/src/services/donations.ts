import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { CreateDonationInput, Donation, DonationStatus } from '../types/donation';

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
  await updateDoc(doc(db, 'donations', id), { status, updatedAt: serverTimestamp() });
}

export async function getAvailableDonations(): Promise<Donation[]> {
  const snapshot = await getDocs(query(
    donationsCollection,
    where('status', '==', 'AVAILABLE'),
    orderBy('createdAt', 'desc'),
  ));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Donation));
}

export function donationsQuery() {
  return query(donationsCollection, orderBy('createdAt', 'desc'));
}
