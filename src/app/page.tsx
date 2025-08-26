'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Shield, Users, Zap, Sparkles, Star, ArrowRight, ArrowLeft, CheckCircle, Lock, Share } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { data: session } = useSession();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const shareCards = [
    {
      emoji: "💝",
      category: "Compliment",
      message: "You have the most beautiful smile that brightens everyone's day. Keep spreading joy!",
      color: "from-pink-100 to-pink-200"
    },
    {
      emoji: "💪",
      category: "Encouragement", 
      message: "You're stronger than you know. Every challenge you face makes you more resilient.",
      color: "from-blue-100 to-blue-200"
    },
    {
      emoji: "🙏",
      category: "Gratitude",
      message: "Thank you for being the kind of person who makes the world a better place.",
      color: "from-green-100 to-green-200"
    },
    {
      emoji: "🎯",
      category: "Fun Dare",
      message: "I dare you to dance like nobody's watching for the next 3 minutes!",
      color: "from-purple-100 to-purple-200"
    },
    {
      emoji: "✨",
      category: "Appreciation",
      message: "Your creativity and passion inspire everyone around you. Never stop being amazing!",
      color: "from-yellow-100 to-yellow-200"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % shareCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [shareCards.length]);

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
              {session ? (
                <Link href="/inbox">
                  <Button className="bg-pink-500 hover:bg-pink-600">Go to Inbox</Button>
                </Link>
              ) : (
                <>
                  <Link href="/signin">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/signin">
                    <Button className="bg-pink-500 hover:bg-pink-600">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Heart className="h-20 w-20 text-pink-500 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Anonymous compliments.
            <br />
            <span className="text-pink-500">Only the good vibes.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Share your link and collect uplifting messages from your friends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Link href="/inbox">
                <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-lg px-8 py-3">
                  Go to Inbox
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/signin">
                  <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-lg px-8 py-3">
                    Get Your Uplift Link
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                    Check Your Inbox
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How It Works - 2D Design */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="h-8 w-8 text-yellow-500" />
              How the Magic Happens
              <Sparkles className="h-8 w-8 text-yellow-500" />
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-pink-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Create your link</h3>
              <p className="text-gray-600">Choose a username & get your unique link</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Share it anywhere</h3>
              <p className="text-gray-600">Post to Instagram/TikTok stories, bio, or DMs</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Collect uplifts</h3>
              <p className="text-gray-600">See anonymous compliments in your inbox & share them back</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Safety */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Anon Uplift is different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Positive-only categories</h3>
              <p className="text-gray-600">Compliment, Gratitude, Encouragement, Fun Dare</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <Lock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safe & secure</h3>
              <p className="text-gray-600">Profanity filter + reporting system</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <Share className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Made for sharing</h3>
              <p className="text-gray-600">Easy Instagram/TikTok cards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Message Categories - 2D Design */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Message Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2">Compliments</h3>
              <p className="text-gray-600">Share what you admire about someone</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-semibold mb-2">Encouragement</h3>
              <p className="text-gray-600">Give someone strength during tough times</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="text-xl font-semibold mb-2">Gratitude</h3>
              <p className="text-gray-600">Express your thankfulness</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Fun Dares</h3>
              <p className="text-gray-600">Challenge someone to do something fun</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beautiful Share Cards - Matching user view design */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-16">Beautiful Share Cards</h2>
          <div className="relative max-w-2xl mx-auto">
            {/* Card Container */}
            <div className="relative overflow-hidden rounded-2xl">
              {shareCards.map((card, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ease-in-out ${
                    index === currentCardIndex 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <div className="bg-gradient-to-br from-pink-100 via-white to-blue-100 rounded-2xl p-8 border-4 border-white shadow-lg" style={{ minHeight: '250px' }}>
                    {/* Card Header */}
                    <div className="text-center mb-6">
                      <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Anonymous Message</h3>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl">{card.emoji}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${card.category === 'Compliment' ? 'bg-pink-100 text-pink-800 border-pink-200' : card.category === 'Encouragement' ? 'bg-blue-100 text-blue-800 border-blue-200' : card.category === 'Gratitude' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-purple-100 text-purple-800 border-purple-200'}`}>
                          {card.category}
                        </span>
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="text-center mb-6">
                      <blockquote className="text-xl text-gray-800 leading-relaxed italic">
                        "{card.message}"
                      </blockquote>
                    </div>

                    {/* Card Footer */}
                    <div className="text-center text-gray-600">
                      <p className="text-sm">via Anon Uplift</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {shareCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCardIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentCardIndex 
                      ? 'bg-pink-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 mt-8">
            Every message can be turned into a beautiful shareable card
          </p>
        </div>
      </section>

      {/* CTA Section - High-converting design */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-500 to-purple-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to get your first compliment?</h2>
          <p className="text-xl text-pink-100 mb-8">
            Join thousands of people who are making the world a brighter place, 
            one anonymous message at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Link href="/inbox">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-pink-600 hover:bg-gray-100">
                  Go to Inbox
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/signin">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-pink-600 hover:bg-gray-100">
                    Get Your Uplift Link
                  </Button>
                </Link>
              </>
            )}
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
                <li><Link href="/signin" className="hover:text-white">Get Started</Link></li>
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
            <p>Anon Uplift © 2025 — Spread positivity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

