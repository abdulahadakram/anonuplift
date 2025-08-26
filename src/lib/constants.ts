import { MessageCategory, MessageCategoryInfo } from '@/types';

// Message categories with emojis and colors
export const MESSAGE_CATEGORIES: MessageCategoryInfo[] = [
  {
    value: 'compliment',
    label: 'Compliment',
    emoji: '💝',
    color: 'bg-pink-100 text-pink-800 border-pink-200'
  },
  {
    value: 'encouragement',
    label: 'Encouragement',
    emoji: '💪',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    value: 'gratitude',
    label: 'Gratitude',
    emoji: '🙏',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    value: 'fun_dare',
    label: 'Fun Dare',
    emoji: '🎯',
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  }
];

// Validation constants
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;
export const USERNAME_REGEX = /^[a-z0-9]+$/;
export const MESSAGE_MAX_LENGTH = 280;

// Rate limiting
export const RATE_LIMIT_MAX_MESSAGES = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// App metadata
export const APP_NAME = 'Anon Uplift';
export const APP_DESCRIPTION = 'Anonymous compliments—only the good vibes.';
export const APP_URL = 'https://anonuplift.com';

// Social sharing
export const SHARE_TEXT = 'Send me anonymous positive vibes! ✨';
export const WATERMARK_TEXT = 'anonuplift.com';

// Error messages
export const ERROR_MESSAGES = {
  USERNAME_TAKEN: 'This username is already taken. Try another one!',
  USERNAME_INVALID: 'Username must be 3-20 characters, lowercase letters and numbers only.',
  MESSAGE_TOO_LONG: `Message must be ${MESSAGE_MAX_LENGTH} characters or less.`,
  CATEGORY_REQUIRED: 'Please select a category for your message.',
  PROFANITY_DETECTED: 'Your message contains inappropriate content. Please keep it positive!',
  RATE_LIMITED: 'You\'re sending messages too quickly. Please wait a bit before sending another.',
  CAPTCHA_FAILED: 'Please complete the captcha verification.',
  USER_NOT_FOUND: 'User not found.',
  UNAUTHORIZED: 'You must be logged in to perform this action.',
  SERVER_ERROR: 'Something went wrong. Please try again later.'
};
