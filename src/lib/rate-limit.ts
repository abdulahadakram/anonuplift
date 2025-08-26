import { Redis } from '@upstash/redis';
import { RATE_LIMIT_MAX_MESSAGES, RATE_LIMIT_WINDOW_MS } from './constants';

// In-memory rate limit store for development/fallback
const memoryStore = new Map<string, { count: number; resetTime: number }>();

// Initialize Redis client
let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && 
    process.env.UPSTASH_REDIS_REST_TOKEN && 
    process.env.UPSTASH_REDIS_REST_URL.startsWith('https://')) {
  try {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (error) {
    console.warn('Redis initialization failed:', error);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export async function checkRateLimit(
  key: string,
  maxRequests: number = RATE_LIMIT_MAX_MESSAGES,
  windowMs: number = RATE_LIMIT_WINDOW_MS
): Promise<RateLimitResult> {
  const now = Date.now();
  const resetTime = now + windowMs;

  try {
    if (redis) {
      // Use Redis for production
      return await checkRateLimitRedis(key, maxRequests, windowMs);
    } else {
      // Fallback to in-memory storage
      return checkRateLimitMemory(key, maxRequests, windowMs);
    }
  } catch (error) {
    console.error('Rate limit check failed, falling back to memory:', error);
    return checkRateLimitMemory(key, maxRequests, windowMs);
  }
}

async function checkRateLimitRedis(
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<RateLimitResult> {
  const now = Date.now();
  const resetTime = now + windowMs;
  
  // Use Redis pipeline for atomic operations
  const pipeline = redis!.pipeline();
  
  // Get current count
  pipeline.get(key);
  // Set expiry
  pipeline.expire(key, Math.ceil(windowMs / 1000));
  
  const results = await pipeline.exec();
  const currentCount = parseInt(results[0] as string) || 0;
  
  if (currentCount >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime
    };
  }
  
  // Increment counter
  await redis!.incr(key);
  
  return {
    allowed: true,
    remaining: maxRequests - currentCount - 1,
    resetTime
  };
}

function checkRateLimitMemory(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const record = memoryStore.get(key);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    memoryStore.set(key, { count: 1, resetTime: now + windowMs });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    };
  }
  
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime
    };
  }
  
  // Increment counter
  record.count++;
  memoryStore.set(key, record);
  
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime
  };
}

// Clean up expired entries from memory store
export function cleanupMemoryStore() {
  const now = Date.now();
  const keysToDelete: string[] = [];
  
  memoryStore.forEach((record, key) => {
    if (now > record.resetTime) {
      keysToDelete.push(key);
    }
  });
  
  keysToDelete.forEach(key => memoryStore.delete(key));
}

// Run cleanup every 5 minutes
if (typeof window === 'undefined') {
  setInterval(cleanupMemoryStore, 5 * 60 * 1000);
}
