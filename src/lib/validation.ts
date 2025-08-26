import { z } from 'zod';
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, MESSAGE_MAX_LENGTH } from './constants';

// Username validation schema
export const usernameSchema = z
  .string()
  .min(USERNAME_MIN_LENGTH, `Username must be at least ${USERNAME_MIN_LENGTH} characters`)
  .max(USERNAME_MAX_LENGTH, `Username must be ${USERNAME_MAX_LENGTH} characters or less`)
  .regex(/^[a-z0-9]+$/, 'Username can only contain lowercase letters and numbers')
  .transform(val => val.toLowerCase());

// Message validation schema
export const messageSchema = z.object({
  category: z.enum(['compliment', 'encouragement', 'gratitude', 'fun_dare']),
  body: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(MESSAGE_MAX_LENGTH, `Message must be ${MESSAGE_MAX_LENGTH} characters or less`)
    .trim()
});

// Message submission schema (includes optional captcha)
export const messageSubmissionSchema = messageSchema.extend({
  turnstileToken: z.string().optional()
});

// User profile update schema
export const userProfileSchema = z.object({
  displayName: z.string().min(1, 'Display name is required').max(50, 'Display name too long').optional(),
  photoURL: z.string().url('Invalid URL').optional()
});

// API response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional()
});

// Rate limit response schema
export const rateLimitResponseSchema = z.object({
  allowed: z.boolean(),
  remaining: z.number(),
  resetTime: z.number()
});

// Turnstile response schema
export const turnstileResponseSchema = z.object({
  success: z.boolean(),
  challenge_ts: z.string().optional(),
  hostname: z.string().optional(),
  'error-codes': z.array(z.string()).optional()
});
