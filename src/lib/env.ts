// Environment variable validation and configuration
export const env = {
  // Auth
  AUTH_SECRET: process.env.AUTH_SECRET || 'dev-secret-key-change-in-production',
  AUTH_URL: process.env.AUTH_URL || 'http://localhost:3000',
  
  // Facebook OAuth
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  
  // Email Magic Link
  EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
  EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,
  
  // Firebase (server SDK)
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  
  // Upstash Redis (optional)
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  
  // Cloudflare Turnstile
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  
  // Security
  IP_SALT: process.env.IP_SALT || 'dev-salt-change-in-production',
  
  // App
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

// Check if required environment variables are set
export function validateEnv() {
  const required = [
    'AUTH_SECRET',
    'FACEBOOK_CLIENT_ID',
    'FACEBOOK_CLIENT_SECRET',
    'EMAIL_SERVER_HOST',
    'EMAIL_SERVER_USER',
    'EMAIL_SERVER_PASSWORD',
    'EMAIL_FROM',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn('⚠️  Missing required environment variables:', missing.join(', '));
    console.warn('📝 Please check your .env.local file');
    
    if (env.IS_PRODUCTION) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }

  // Check Firebase configuration
  if (!env.FIREBASE_PROJECT_ID) {
    console.warn('⚠️  Firebase not configured - some features will be limited');
  }

  // Check Turnstile configuration
  if (!env.TURNSTILE_SECRET_KEY) {
    console.warn('⚠️  Cloudflare Turnstile not configured - captcha will be disabled');
  }

  return env;
}
