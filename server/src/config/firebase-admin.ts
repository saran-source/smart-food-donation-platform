import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  console.warn('Firebase Admin credentials are not configured. Database access will be unavailable until environment variables are provided.');
}

const adminApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: projectId && clientEmail && privateKey
        ? cert({ projectId, clientEmail, privateKey })
        : undefined,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });

export const firestore = getFirestore(adminApp);
export const storage = getStorage(adminApp);
