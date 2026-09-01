import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { FoodRequest } from '../types/request';

export type CreateFoodRequestInput = Omit<FoodRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

export async function createFoodRequest(input: CreateFoodRequestInput): Promise<string> {
  const ref = await addDoc(collection(db, 'requests'), {
    ...input,
    status: 'OPEN',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}
