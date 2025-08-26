import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import crypto from 'crypto';

// Try to import leo-profanity, but handle cases where it's not available
let leoProfanity: any = null;
try {
  leoProfanity = require('leo-profanity');
} catch (error) {
  console.warn('leo-profanity not available, profanity filtering disabled');
}

// Tailwind CSS class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Hash IP address with salt for privacy
export function hashIP(ip: string): string {
  const salt = process.env.IP_SALT || 'default-salt';
  return crypto.createHash('sha256').update(ip + salt).digest('hex');
}

// Hash user agent with salt
export function hashUserAgent(userAgent: string): string {
  const salt = process.env.IP_SALT || 'default-salt';
  return crypto.createHash('sha256').update(userAgent + salt).digest('hex');
}

// Profanity filter setup
export function setupProfanityFilter() {
  if (!leoProfanity) {
    // Return a dummy filter if leo-profanity is not available
    return {
      check: () => false,
      clean: (text: string) => text,
      addWords: () => {}
    };
  }
  
  try {
    // Check if addWords method exists, if not use addWord instead
    if (typeof leoProfanity.addWords === 'function') {
      // Add custom words to block
      leoProfanity.addWords(
        'hate', 'stupid', 'ugly', 'fat', 'dumb', 'idiot', 'moron',
        'kill', 'die', 'suicide', 'self-harm', 'bully', 'harass'
      );
    } else if (typeof leoProfanity.addWord === 'function') {
      // Use addWord method if addWords doesn't exist
      const customWords = ['hate', 'stupid', 'ugly', 'fat', 'dumb', 'idiot', 'moron',
        'kill', 'die', 'suicide', 'self-harm', 'bully', 'harass'];
      customWords.forEach(word => leoProfanity.addWord(word));
    }
    
    return leoProfanity;
  } catch (error) {
    console.warn('Failed to setup profanity filter:', error);
    // Return a dummy filter on error
    return {
      check: () => false,
      clean: (text: string) => text,
      addWords: () => {}
    };
  }
}

// Check if message contains profanity
export function containsProfanity(text: string): boolean {
  try {
    const filter = setupProfanityFilter();
    return filter.check(text);
  } catch (error) {
    console.warn('Profanity check failed:', error);
    return false; // Fail safe - don't block messages if filter fails
  }
}

// Clean profanity from text
export function cleanProfanity(text: string): string {
  try {
    const filter = setupProfanityFilter();
    return filter.clean(text);
  } catch (error) {
    console.warn('Profanity cleaning failed:', error);
    return text; // Return original text if cleaning fails
  }
}

// Format timestamp for display
export function formatTimestamp(timestamp: Date | string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}

// Generate initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Validate username format
export function isValidUsername(username: string): boolean {
  const regex = /^[a-z0-9]{3,20}$/;
  return regex.test(username);
}

// Generate share URL
export function generateShareUrl(username: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/u/${username}`;
}

// Copy to clipboard utility
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// Web Share API utility
export async function shareContent(data: { title: string; text: string; url: string }): Promise<boolean> {
  try {
    if (navigator.share) {
      await navigator.share(data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to share:', error);
    return false;
  }
}
