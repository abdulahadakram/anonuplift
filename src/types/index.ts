import { Timestamp } from 'firebase-admin/firestore';

// User document in Firestore
export interface UserDoc {
  uid: string;
  email?: string;
  facebookId?: string;
  instagramBusinessId?: string;
  username: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Username reservation document
export interface UsernameDoc {
  uid: string;
}

// Message document in Firestore
export interface MessageDoc {
  id: string;
  recipientId: string;
  category: MessageCategory;
  content: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  deleted?: boolean;
  reported?: boolean;
  ipHash?: string;
  uaHash?: string;
}

// Message category type
export type MessageCategory = 'compliment' | 'encouragement' | 'gratitude' | 'fun_dare';

// Message category with emoji (for UI display)
export interface MessageCategoryInfo {
  value: MessageCategory;
  label: string;
  emoji: string;
  color: string;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Rate limiting response
export interface RateLimitResponse {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

// Turnstile verification response
export interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

// Instagram connection response
export interface InstagramConnectionResponse {
  success: boolean;
  instagramBusinessId?: string;
  error?: string;
}
