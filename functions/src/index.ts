import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();
const db = getFirestore();

export const notifyDonationClaimed = onDocumentUpdated('donations/{donationId}', async (event) => {
  const before = event.data?.before.data();
  const after = event.data?.after.data();
  if (!before || !after || before.status === after.status || after.status !== 'CLAIMED') return;
  if (!after.donorId || !after.claimedBy) return;

  await db.collection('notifications').add({
    userId: after.donorId,
    title: 'Donation claimed',
    message: 'Your food donation has been claimed by an NGO.',
    type: 'DONATION_CLAIMED',
    read: false,
    createdAt: new Date(),
  });
});

export const notifyPickupUpdated = onDocumentUpdated('pickups/{pickupId}', async (event) => {
  const before = event.data?.before.data();
  const after = event.data?.after.data();
  if (!before || !after || before.status === after.status) return;

  const recipients = [after.donorId, after.ngoId, after.volunteerId].filter(Boolean) as string[];
  const uniqueRecipients = [...new Set(recipients)];
  await Promise.all(uniqueRecipients.map((userId) => db.collection('notifications').add({
    userId,
    title: 'Pickup updated',
    message: `Pickup status changed to ${after.status}.`,
    type: after.status === 'DELIVERED' ? 'DONATION_DELIVERED' : 'PICKUP_UPDATED',
    read: false,
    createdAt: new Date(),
  })));
});
