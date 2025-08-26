'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Shield, Users, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold text-gray-900">Anon Uplift</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/onboarding">
                <Button className="bg-pink-500 hover:bg-pink-600">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Heart className="h-20 w-20 text-pink-500 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Spread Positivity
            <br />
            <span className="text-pink-500">Anonymously</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Send anonymous messages of love, encouragement, and gratitude to people who matter to you. 
            Create meaningful connections without revealing your identity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-lg px-8 py-3">
                Start Sending Love
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Check Your Inbox
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Trusted by Thousands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">100% Anonymous</h3>
              <p className="text-gray-600">Your identity is never revealed to recipients</p>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Delivery</h3>
              <p className="text-gray-600">Messages are delivered immediately</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Built with privacy and security in mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Username</h3>
              <p className="text-gray-600">Pick a unique username to get your personal link</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Link</h3>
              <p className="text-gray-600">Share your link on social media or send it to friends</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive Messages</h3>
              <p className="text-gray-600">Check your inbox for anonymous messages of love</p>
            </div>
          </div>
        </div>
      </section>

      {/* Message Categories */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Message Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2">Compliments</h3>
              <p className="text-gray-600">Share what you admire about someone</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-semibold mb-2">Encouragement</h3>
              <p className="text-gray-600">Give someone strength during tough times</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="text-xl font-semibold mb-2">Gratitude</h3>
              <p className="text-gray-600">Express your thankfulness</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Fun Dares</h3>
              <p className="text-gray-600">Challenge someone to do something fun</p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Share Card */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-16">Beautiful Share Cards</h2>
          <div className="bg-gradient-to-br from-pink-100 via-white to-blue-100 rounded-2xl p-12 border-4 border-white shadow-2xl max-w-2xl mx-auto">
            <Heart className="h-16 w-16 text-pink-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Anonymous Message</h3>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-2xl">💝</span>
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium border border-pink-200">
                Compliment
              </span>
            </div>
            <blockquote className="text-xl text-gray-800 leading-relaxed italic mb-6">
              "You have the most beautiful smile that brightens everyone's day. Keep spreading joy!"
            </blockquote>
            <div className="text-center text-gray-600">
              <p className="text-sm">via Anon Uplift</p>
            </div>
          </div>
          <p className="text-gray-600 mt-8">
            Every message can be turned into a beautiful shareable card
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-pink-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Spread Some Love?</h2>
          <p className="text-xl text-pink-100 mb-8">
            Join thousands of people who are making the world a better place, one anonymous message at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Get Started Now
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-pink-500">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-pink-500" />
                <span className="text-xl font-bold">Anon Uplift</span>
              </div>
              <p className="text-gray-400">
                Spreading positivity anonymously, one message at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/onboarding" className="hover:text-white">Get Started</Link></li>
                <li><Link href="/signin" className="hover:text-white">Sign In</Link></li>
                <li><Link href="/inbox" className="hover:text-white">Inbox</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Anon Uplift. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
