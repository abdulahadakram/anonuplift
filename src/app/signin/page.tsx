'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heart, Facebook, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signIn('facebook', { callbackUrl: '/onboarding' });
    } catch (error) {
      console.error('Facebook login failed:', error);
      setError('Facebook login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');
    try {
      const result = await signIn('email', { 
        email, 
        callbackUrl: '/onboarding',
        redirect: false 
      });
      
      if (result?.error) {
        setError('Failed to send magic link. Please try again.');
      } else {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Email login failed:', error);
      setError('Failed to send magic link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setEmailSent(false);
    setError('');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">Back to home</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-gray-900">Anon Uplift</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-lg text-gray-600">
              Sign in to access your anonymous messages
            </p>
          </div>

          {!emailSent ? (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Facebook Login */}
              <Button
                onClick={handleFacebookLogin}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6 py-3"
              >
                <Facebook className="h-5 w-5 mr-2" />
                Continue with Facebook
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Email Login */}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Continue with Email
                </Button>
              </form>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>
          ) : (
            /* Email Sent State */
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Check your email!
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;ve sent a magic link to <strong>{email}</strong>. 
                Click the link to sign in.
              </p>
              <Button
                onClick={handleClose}
                variant="outline"
                className="w-full"
              >
                Back to home
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <Link href="/legal/terms" className="text-pink-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/legal/privacy" className="text-pink-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
