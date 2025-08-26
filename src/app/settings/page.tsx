'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, User, Instagram, Facebook, Mail, Shield, Bell, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

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

  if (status === 'unauthenticated') {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-pink-500 mr-3" />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">
                {session?.user?.username || 'Not set'}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">
                {session?.user?.email}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button
              onClick={() => router.push('/onboarding')}
              className="bg-pink-500 hover:bg-pink-600"
            >
              Update Username
            </Button>
          </div>
        </div>

        {/* Social Connections */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <Instagram className="h-6 w-6 text-pink-500 mr-3" />
            <h2 className="text-xl font-semibold">Social Connections</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <Facebook className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium">Facebook</h3>
                  <p className="text-sm text-gray-600">Connected for authentication</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-medium">Connected</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <Instagram className="h-5 w-5 text-pink-600 mr-3" />
                <div>
                  <h3 className="font-medium">Instagram</h3>
                  <p className="text-sm text-gray-600">Connect to share your link</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Connecting Instagram allows you to easily share your Anon Uplift link 
              and track engagement from your social media followers.
            </p>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-6 w-6 text-pink-500 mr-3" />
            <h2 className="text-xl font-semibold">Privacy & Security</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium">Profile Visibility</h3>
                <p className="text-sm text-gray-600">Your profile is public for receiving messages</p>
              </div>
              <span className="text-gray-600 text-sm">Public</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium">Message Filtering</h3>
                <p className="text-sm text-gray-600">Profanity and spam protection enabled</p>
              </div>
              <span className="text-green-600 text-sm font-medium">Enabled</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium">Rate Limiting</h3>
                <p className="text-sm text-gray-600">Prevents spam and abuse</p>
              </div>
              <span className="text-green-600 text-sm font-medium">Enabled</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <Bell className="h-6 w-6 text-pink-500 mr-3" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium">New Message Alerts</h3>
                <p className="text-sm text-gray-600">Get notified when you receive new messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium">Weekly Digest</h3>
                <p className="text-sm text-gray-600">Receive a summary of your weekly messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-200">
          <div className="flex items-center mb-6">
            <Trash2 className="h-6 w-6 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-medium text-red-800 mb-2">Delete Account</h3>
              <p className="text-sm text-red-700 mb-4">
                This action cannot be undone. This will permanently delete your account, 
                username, and all associated messages.
              </p>
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {message && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
