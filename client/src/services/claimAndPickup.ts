import { collection, doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface ClaimAndPickupInput {
  donationId: string;
  ngoId: string;
  deliveryAddress: string;
}

/** Atomically claims an available donation and creates its initial pickup record. */
export async function claimAndCreatePickup({ donationId, ngoId, deliveryAddress }: ClaimAndPickupInput) {
  const donationRef = doc(db, 'donations', donationId);
  const pickupRef = doc(collection(db, 'pickups'));

  await runTransaction(db, async (transaction) => {
    const donationSnapshot = await transaction.get(donationRef);
    if (!donationSnapshot.exists()) throw new Error('Donation not found.');

    const donation = donationSnapshot.data();
    if (donation.status !== 'AVAILABLE') throw new Error('Donation is no longer available.');

    transaction.update(donationRef, {
      status: 'CLAIMED',
      claimedBy: ngoId,
      claimedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    transaction.set(pickupRef, {
      donationId,
      donorId: donation.donorId,
      ngoId,
      pickupAddress: donation.location.address,
      deliveryAddress,
      pickupTime: donation.pickupStart,
      status: 'ASSIGNED',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });

  return pickupRef.id;
}
