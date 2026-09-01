import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'DONATION_CLAIMED' | 'PICKUP_ASSIGNED' | 'PICKUP_UPDATED' | 'DONATION_DELIVERED' | 'SYSTEM';
  read: boolean;
  createdAt?: unknown;
}

export async function createNotification(input: Omit<AppNotification, 'id' | 'createdAt'>) {
  await addDoc(collection(db, 'notifications'), {
    ...input,
    createdAt: serverTimestamp(),
  });
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  await updateDoc(doc(db, 'notifications', notificationId), { read: true });
}

export function subscribeToNotifications(userId: string, callback: (items: AppNotification[]) => void) {
  const notificationsQuery = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  );

  return onSnapshot(notificationsQuery, (snapshot) => {
    callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as AppNotification));
  });
}
