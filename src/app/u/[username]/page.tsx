'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heart, Send, Check, Share2, Copy } from 'lucide-react';
import { MESSAGE_CATEGORIES, MESSAGE_MAX_LENGTH } from '@/lib/constants';
import { generateShareUrl, copyToClipboard } from '@/lib/utils';
import Turnstile from 'react-turnstile';

interface User {
  username: string;
  displayName?: string;
}

export default function SenderPage() {
  const params = useParams();
  const username = params.username as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [message, setMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${username}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.data);
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setError('Failed to load user');
    }
  }, [username]);

  useEffect(() => {
    // Fetch user info
    fetchUserInfo();
    
    // Check if Turnstile is enabled
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    setTurnstileEnabled(!!siteKey && siteKey.length > 0);
  }, [fetchUserInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      setError('Please select a category');
      return;
    }
    
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }
    
    // Only require Turnstile if it's enabled
    if (turnstileEnabled && !turnstileToken) {
      setError('Please complete the captcha');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/messages/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory,
          body: message.trim(),
          turnstileToken: turnstileEnabled ? turnstileToken : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `Send anonymous positive vibes to ${user?.displayName || username}`,
          text: 'Spread some love anonymously! 💕',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying link
      const shareUrl = generateShareUrl(username);
      copyToClipboard(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Message Sent! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your anonymous positive message has been delivered to{' '}
              <span className="font-semibold text-pink-600">
                {user?.displayName || username}
              </span>
              . They&apos;ll see it in their inbox!
            </p>
            
            <div className="space-y-4">
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedCategory('');
                  setMessage('');
                  setTurnstileToken('');
                  setError('');
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3"
              >
                Send Another Message
              </Button>
              
              <div className="pt-4">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share This Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error === 'User not found') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto h-20 w-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              User Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The user <span className="font-mono bg-gray-100 px-2 py-1 rounded">@{username}</span> doesn&apos;t exist or hasn&apos;t set up their profile yet.
            </p>
            <Button
              onClick={() => window.history.back()}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold text-gray-900">Anon Uplift</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* User Info */}
          <div className="text-center mb-12">
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : username.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Send anonymous positive vibes to{' '}
              <span className="text-pink-600">
                {user?.displayName || username}
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Choose a category and write your anonymous message below
            </p>
          </div>

          {/* Message Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Message Category *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {MESSAGE_CATEGORIES.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setSelectedCategory(category.value)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      selectedCategory === category.value
                        ? `${category.color} border-current scale-105`
                        : 'border-gray-200 hover:border-gray-300 hover:scale-102'
                    }`}
                  >
                    <div className="text-2xl mb-2">{category.emoji}</div>
                    <div className="font-medium text-sm">{category.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message *
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your anonymous message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                rows={4}
                maxLength={MESSAGE_MAX_LENGTH}
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  Keep it positive and uplifting! ✨
                </p>
                <p className="text-sm text-gray-500">
                  {message.length}/{MESSAGE_MAX_LENGTH}
                </p>
              </div>
            </div>

            {/* Turnstile Captcha - Only show if enabled */}
            {turnstileEnabled && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Security Verification *
                </label>
                <Turnstile
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                  onVerify={(token) => setTurnstileToken(token)}
                  theme="light"
                  size="normal"
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!selectedCategory || !message.trim() || (turnstileEnabled && !turnstileToken) || isSubmitting}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Anonymous Message
                </>
              )}
            </Button>
          </form>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-pink-500" />
                <span>Positive-only by design</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                <span>Profanity filtered</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                <span>Rate limited</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
