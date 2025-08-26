'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heart, Check, Copy, ArrowRight } from 'lucide-react';
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_REGEX } from '@/lib/constants';
import { generateShareUrl, copyToClipboard } from '@/lib/utils';

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Redirect if already has username
  useEffect(() => {
    if (session?.user?.username) {
      router.push('/inbox');
    }
  }, [session, router]);

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

  if (!session) {
    return null;
  }

  const handleUsernameChange = (value: string) => {
    const newUsername = value.toLowerCase();
    setUsername(newUsername);
    
    // Reset availability check
    if (isAvailable !== null) {
      setIsAvailable(null);
    }

    // Check availability after user stops typing
    if (newUsername.length >= USERNAME_MIN_LENGTH && USERNAME_REGEX.test(newUsername)) {
      const timeoutId = setTimeout(() => checkUsernameAvailability(newUsername), 500);
      return () => clearTimeout(timeoutId);
    }
  };

  const checkUsernameAvailability = async (usernameToCheck: string) => {
    if (usernameToCheck.length < USERNAME_MIN_LENGTH || !USERNAME_REGEX.test(usernameToCheck)) {
      return;
    }

    setIsChecking(true);
    try {
      const response = await fetch(`/api/username/check?username=${usernameToCheck}`);
      const data = await response.json();
      setIsAvailable(data.available);
    } catch (error) {
      console.error('Failed to check username availability:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !isAvailable) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        // Redirect to inbox
        router.push('/inbox');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to set username');
      }
    } catch (error) {
      console.error('Failed to set username:', error);
      alert('Failed to set username. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = async () => {
    if (username && isAvailable) {
      const url = generateShareUrl(username);
      const success = await copyToClipboard(url);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const getUsernameStatus = () => {
    if (username.length === 0) return null;
    if (username.length < USERNAME_MIN_LENGTH) return 'too-short';
    if (username.length > USERNAME_MAX_LENGTH) return 'too-long';
    if (!USERNAME_REGEX.test(username)) return 'invalid';
    if (isChecking) return 'checking';
    if (isAvailable === true) return 'available';
    if (isAvailable === false) return 'taken';
    return null;
  };

  const getStatusMessage = () => {
    const status = getUsernameStatus();
    switch (status) {
      case 'too-short':
        return `Username must be at least ${USERNAME_MIN_LENGTH} characters`;
      case 'too-long':
        return `Username must be ${USERNAME_MAX_LENGTH} characters or less`;
      case 'invalid':
        return 'Username can only contain lowercase letters and numbers';
      case 'checking':
        return 'Checking availability...';
      case 'available':
        return 'Username is available!';
      case 'taken':
        return 'Username is already taken';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    const status = getUsernameStatus();
    switch (status) {
      case 'available':
        return 'text-green-600';
      case 'taken':
        return 'text-red-600';
      case 'invalid':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-gray-900">Anon Uplift</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose your username
            </h1>
            <p className="text-xl text-gray-600">
              Pick a unique username to get your shareable link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  maxLength={USERNAME_MAX_LENGTH}
                />
                {isAvailable === true && (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
              
              {/* Status Message */}
              {getUsernameStatus() && (
                <p className={`mt-2 text-sm ${getStatusColor()}`}>
                  {getStatusMessage()}
                </p>
              )}
              
              {/* Character Count */}
              <p className="mt-2 text-sm text-gray-500 text-right">
                {username.length}/{USERNAME_MAX_LENGTH}
              </p>
            </div>

            {/* Preview */}
            {username && isAvailable && (
              <div className="p-6 bg-white rounded-2xl border-2 border-green-200 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Your shareable link:</h3>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-mono text-sm break-all">
                    {generateShareUrl(username)}
                  </span>
                  <Button
                    type="button"
                    onClick={handleCopyLink}
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Share this link on Instagram, TikTok, or anywhere to receive anonymous messages
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!username || !isAvailable || isSubmitting}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 text-lg rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Setting username...
                </>
              ) : (
                <>
                  Get my link
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Username must be {USERNAME_MIN_LENGTH}-{USERNAME_MAX_LENGTH} characters long and contain only lowercase letters and numbers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
