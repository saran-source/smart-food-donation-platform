export const USER_ROLES = ['DONOR', 'NGO', 'VOLUNTEER', 'RECIPIENT', 'ADMIN'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  photoURL?: string;
  organizationName?: string;
  createdAt: string;
  updatedAt: string;
}
