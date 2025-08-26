'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Heart, Mail, Facebook, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function TestAuthPage() {
  const { data: session, status } = useSession();
  const [isTesting, setIsTesting] = useState(false);

  const handleEmailTest = async () => {
    try {
      setIsTesting(true);
      const result = await signIn('email', {
        email: 'test@example.com',
        redirect: false,
      });
      console.log('Email sign-in result:', result);
      alert(`Email sign-in result: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error('Email sign-in error:', error);
      alert(`Email sign-in error: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleFacebookTest = async () => {
    try {
      setIsTesting(true);
      await signIn('facebook', { redirect: false });
    } catch (error) {
      console.error('Facebook sign-in error:', error);
      alert(`Facebook sign-in error: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Auth Test Page</h1>
          <p className="text-gray-600">Test authentication functionality</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Current Session</h2>
            <Button onClick={handleRefresh} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <pre className="text-sm text-gray-700 overflow-auto">
              {JSON.stringify({ status, session }, null, 2)}
            </pre>
          </div>

          {session ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  ✅ <strong>Authenticated!</strong> User ID: {session.user?.id}
                </p>
                <p className="text-green-700">Email: {session.user?.email}</p>
                <p className="text-green-700">Username: {session.user?.username || 'Not set'}</p>
              </div>
              
              <Button
                onClick={() => signOut()}
                variant="outline"
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">
                  ⚠️ <strong>Not authenticated</strong>
                </p>
                <p className="text-yellow-700">Try signing in with one of the methods below</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={handleEmailTest}
                  disabled={isTesting}
                  className="w-full bg-pink-500 hover:bg-pink-600"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  {isTesting ? 'Testing...' : 'Test Email Auth'}
                </Button>
                
                <Button
                  onClick={handleFacebookTest}
                  disabled={isTesting}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Facebook className="h-5 w-5 mr-2" />
                  {isTesting ? 'Testing...' : 'Test Facebook Auth'}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Firebase Project ID:</span>
              <span className={process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'text-green-600' : 'text-red-600'}>
                {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Facebook Client ID:</span>
              <span className={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ? 'text-green-600' : 'text-red-600'}>
                {process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ? 'Set' : 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Email Server Host:</span>
              <span className={process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST ? 'text-green-600' : 'text-red-600'}>
                {process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST || 'Not set'}
              </span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> These are client-side environment variables. 
              Server-side variables (like FACEBOOK_CLIENT_SECRET, FIREBASE_PRIVATE_KEY) 
              are not visible here for security reasons.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>1. <strong>Create `.env.local`</strong> file in your project root</p>
            <p>2. <strong>Fill in your credentials</strong> (Facebook App, Gmail, Firebase)</p>
            <p>3. <strong>Restart dev server</strong> after adding environment variables</p>
            <p>4. <strong>Test authentication</strong> with the buttons above</p>
          </div>
        </div>
      </div>
    </div>
  );
}
