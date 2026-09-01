import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Donation } from '../types/donation';

const donationsCollection = collection(db, 'donations');

export function subscribeToAvailableDonations(
  callback: (donations: Donation[]) => void,
  onError?: (error: Error) => void,
) {
  const donationsQuery = query(
    donationsCollection,
    where('status', '==', 'AVAILABLE'),
    orderBy('createdAt', 'desc'),
  );

  return onSnapshot(
    donationsQuery,
    (snapshot) => callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Donation)),
    (error) => onError?.(error),
  );
}

export function subscribeToDonorDonations(
  donorId: string,
  callback: (donations: Donation[]) => void,
  onError?: (error: Error) => void,
) {
  const donationsQuery = query(
    donationsCollection,
    where('donorId', '==', donorId),
    orderBy('createdAt', 'desc'),
  );

  return onSnapshot(
    donationsQuery,
    (snapshot) => callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Donation)),
    (error) => onError?.(error),
  );
}
