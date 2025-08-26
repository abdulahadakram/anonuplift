import { NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import EmailProvider from 'next-auth/providers/email';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { db } from './firebase';
import { env } from './env';

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID!,
      clientSecret: env.FACEBOOK_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST!,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER!,
          pass: env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: env.EMAIL_FROM!,
    }),
  ],
  adapter: db ? FirestoreAdapter(db) : undefined,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.uid = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.uid as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Only try to create user document if Firebase is available
      if (user.id && db) {
        try {
          const userDoc = await db.collection('users').doc(user.id).get();
          if (!userDoc.exists) {
            // Create user document if it doesn't exist
            const userData: any = {
              uid: user.id,
              email: user.email,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            
            // Only add facebookId if it exists and is not undefined
            if (account?.provider === 'facebook' && (profile as any)?.id) {
              userData.facebookId = (profile as any).id;
            }
            
            await db.collection('users').doc(user.id).set(userData);
            console.log('✅ Created new user document in Firestore');
          }
        } catch (error) {
          console.warn('⚠️  Failed to create user document:', error);
          // Don't fail the sign-in if we can't create the document
          // This allows users to sign in even if Firestore has issues
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  secret: env.AUTH_SECRET,
  // Add better error handling
  debug: env.IS_DEVELOPMENT,
};
