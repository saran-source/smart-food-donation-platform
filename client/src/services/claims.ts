import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function claimDonation(donationId: string, ngoId: string): Promise<void> {
  const donationRef = doc(db, 'donations', donationId);

  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(donationRef);
    if (!snapshot.exists()) throw new Error('Donation not found.');

    const donation = snapshot.data();
    if (donation.status !== 'AVAILABLE') {
      throw new Error('This donation has already been claimed or is no longer available.');
    }

    transaction.update(donationRef, {
      status: 'CLAIMED',
      claimedBy: ngoId,
      claimedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
}
