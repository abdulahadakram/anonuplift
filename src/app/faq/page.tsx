'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useState } from 'react';
import Head from 'next/head';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const faqData: FAQItem[] = [
    // General
    {
      question: "What is Anon Uplift?",
      answer: "Anon Uplift is a platform that allows people to send you anonymous positive messages. You create an account, get a personal link, share it with friends, and receive uplifting anonymous messages in your inbox. It's designed to spread positivity and create meaningful connections through anonymous encouragement.",
      category: "General"
    },
    {
      question: "How does Anon Uplift work?",
      answer: "The process is simple: 1) Sign up and choose a username, 2) Get your personal Anon Uplift link, 3) Share the link with friends on social media, in your bio, or via DM, 4) Receive anonymous positive messages in your inbox. All messages are filtered for safety and delivered instantly.",
      category: "General"
    },
    {
      question: "Is it really anonymous?",
      answer: "Yes, absolutely! We never reveal the identity of message senders. All messages are completely anonymous and we don't store any personal information about who sent them. The only thing recipients see is the message content and category. Your privacy is our top priority.",
      category: "General"
    },

    // Privacy & Safety
    {
      question: "Are messages really anonymous?",
      answer: "Yes, messages are completely anonymous. We use advanced encryption and never store sender identification. Message senders remain completely anonymous to recipients. We only see message content for safety filtering purposes, but never who sent it.",
      category: "Privacy & Safety"
    },
    {
      question: "How do you prevent bullying or harmful content?",
      answer: "We use multiple layers of protection: 1) AI-powered content filtering that blocks inappropriate language, 2) Only positive message categories are allowed (compliments, encouragement, gratitude, fun dares), 3) 24/7 human moderation, 4) Easy reporting system for any concerning content, 5) Immediate account suspension for violations.",
      category: "Privacy & Safety"
    },
    {
      question: "What if I receive inappropriate messages?",
      answer: "If you receive any inappropriate content, you can report it immediately using the report button on each message. Our team reviews all reports within 24 hours and takes appropriate action, including blocking users who violate our guidelines. We have a zero-tolerance policy for harassment or harmful content.",
      category: "Privacy & Safety"
    },
    {
      question: "Can people find out who I am?",
      answer: "No, your personal information is never revealed to message senders. They only see your username and can send messages to your personal link. We don't collect or store any identifying information about message senders either. Your privacy is guaranteed.",
      category: "Privacy & Safety"
    },

    // Account & Technical
    {
      question: "Can I change my username?",
      answer: "Yes, you can change your username from your account settings, but only if the new username is available. Keep in mind that changing your username will also change your personal link, so you'll need to share the new link with friends. Username changes are limited to once per month.",
      category: "Account & Technical"
    },
    {
      question: "How do I reset my password?",
      answer: "If you forget your password, use the 'Forgot Password' link on the sign-in page. You'll receive an email with a secure link to create a new password. Make sure to use a strong, unique password for security. We recommend enabling two-factor authentication when available.",
      category: "Account & Technical"
    },
    {
      question: "Can I use Anon Uplift on mobile?",
      answer: "Yes! Anon Uplift is fully responsive and works great on all devices including smartphones and tablets. You can access all features, send messages, and manage your account from any mobile device with a web browser. We're also developing native mobile apps for iOS and Android.",
      category: "Account & Technical"
    },
    {
      question: "Why aren't I receiving messages?",
      answer: "There could be several reasons: 1) Check that you've shared your personal link with friends, 2) Make sure your account is active and verified, 3) Check your spam folder, 4) Ensure your privacy settings allow messages. If the issue persists, contact our support team for help.",
      category: "Account & Technical"
    },

    // Sharing & Social
    {
      question: "How do I share my link on Instagram/TikTok?",
      answer: "Sharing is easy! Copy your personal Anon Uplift link and paste it in your Instagram bio, TikTok bio, or any social media profile. You can also share it in stories, posts, or send it directly to friends via DM. The more you share, the more messages you'll receive!",
      category: "Sharing & Social"
    },
    {
      question: "Can I share beautiful message cards?",
      answer: "Yes! Every message you receive can be shared as a beautiful, customizable card on social media. Simply click the 'Share Card' button on any message to generate a shareable image. This is a great way to spread positivity and encourage others to join Anon Uplift.",
      category: "Sharing & Social"
    }
  ];

  const categories = ["General", "Privacy & Safety", "Account & Technical", "Sharing & Social"];

  const filteredFAQs = searchTerm 
    ? faqData.filter(item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqData;

  return (
    <>
      <Head>
        <title>FAQ - Anon Uplift | Frequently Asked Questions</title>
        <meta name="description" content="Find answers to common questions about Anon Uplift. Learn how to use our anonymous messaging platform safely and effectively." />
        <meta name="keywords" content="FAQ, help, support, anonymous messaging, Anon Uplift, questions" />
      </Head>
      
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
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <HelpCircle className="h-20 w-20 text-pink-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find quick answers to the most common questions about Anon Uplift
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories Overview */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {categories.map((category) => (
                <div key={category} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{category}</h3>
                  <p className="text-sm text-gray-600">
                    {faqData.filter(item => item.category === category).length} questions
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Items */}
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              {searchTerm ? `Search Results for "${searchTerm}"` : 'All Questions'}
            </h2>
            
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or browse all questions below
                </p>
                <Button 
                  onClick={() => setSearchTerm('')}
                  variant="outline"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-inset"
                      aria-expanded={expandedItems.has(index)}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                        <span className="text-sm text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      {expandedItems.has(index) ? (
                        <ChevronUp className="h-6 w-6 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedItems.has(index) && (
                      <div 
                        id={`faq-answer-${index}`}
                        className="px-8 pb-6"
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                      >
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-pink-500">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Still have questions?</h2>
            <p className="text-xl text-pink-100 mb-8">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-pink-600 hover:bg-gray-100">
                  Contact Support
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
    </>
  );
}
