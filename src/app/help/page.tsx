'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, BookOpen, MessageCircle, Shield, Users, Zap, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Head from 'next/head';

interface HelpSection {
  title: string;
  icon: React.ReactNode;
  items: {
    question: string;
    answer: string;
  }[];
}

export default function HelpPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSection = (sectionTitle: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle);
    } else {
      newExpanded.add(sectionTitle);
    }
    setExpandedSections(newExpanded);
  };

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const helpSections: HelpSection[] = [
    {
      title: "Getting Started",
      icon: <Zap className="h-6 w-6" />,
      items: [
        {
          question: "How do I create my Anon Uplift link?",
          answer: "Creating your link is simple! Sign up for an account, choose a unique username, and you'll automatically receive your personal Anon Uplift link. This link is what you'll share with friends so they can send you anonymous messages. You can find your link in your dashboard after signing up."
        },
        {
          question: "How do I receive messages?",
          answer: "Once you have your personal link, share it with friends on social media, in your bio, or via direct message. When someone visits your link, they can send you anonymous messages that will appear in your inbox. Messages are delivered instantly and filtered for safety."
        },
        {
          question: "What types of messages can I receive?",
          answer: "Anon Uplift only allows positive, uplifting messages in these categories: Compliments (appreciation for your qualities), Encouragement (motivational support), Gratitude (thank you messages), and Fun Dares (lighthearted challenges). All messages are filtered to ensure they're appropriate and positive."
        },
        {
          question: "How do I share my link effectively?",
          answer: "The best places to share your link are: Instagram bio, TikTok bio, Twitter bio, Facebook profile, WhatsApp status, or send it directly to friends via DM. You can also include it in your email signature or share it in group chats. The more you share, the more messages you'll receive!"
        }
      ]
    },
    {
      title: "Account Management",
      icon: <Users className="h-6 w-6" />,
      items: [
        {
          question: "How do I sign up for an account?",
          answer: "Visit our signup page and provide your email address and choose a username. You'll receive a verification email to confirm your account. Once verified, you can access your dashboard and start receiving messages. The entire process takes less than 2 minutes."
        },
        {
          question: "Can I change my username?",
          answer: "Yes, you can change your username from your account settings, but only if the new username is available. Keep in mind that changing your username will also change your personal link, so you'll need to share the new link with friends. Username changes are limited to once per month."
        },
        {
          question: "How do I reset my password?",
          answer: "If you forget your password, use the 'Forgot Password' link on the sign-in page. You'll receive an email with a secure link to create a new password. Make sure to use a strong, unique password for security. We recommend enabling two-factor authentication when available."
        },
        {
          question: "How do I delete my account?",
          answer: "You can delete your account at any time from your account settings. When you delete your account, all your data, including received messages, will be permanently removed. This action cannot be undone, so make sure you want to proceed before confirming."
        }
      ]
    },
    {
      title: "Safety & Reporting",
      icon: <Shield className="h-6 w-6" />,
      items: [
        {
          question: "How do you ensure my safety?",
          answer: "We use multiple layers of protection: AI-powered content filtering that blocks inappropriate language, only positive message categories are allowed, 24/7 human moderation, easy reporting system for any concerning content, and immediate account suspension for violations. Your safety is our top priority."
        },
        {
          question: "What if I receive inappropriate messages?",
          answer: "If you receive any inappropriate content, you can report it immediately using the report button on each message. Our team reviews all reports within 24 hours and takes appropriate action, including blocking users who violate our guidelines. We have a zero-tolerance policy for harassment or harmful content."
        },
        {
          question: "Can people find out who I am?",
          answer: "No, your personal information is never revealed to message senders. They only see your username and can send messages to your personal link. We don't collect or store any identifying information about message senders either. Your privacy is guaranteed."
        },
        {
          question: "How do I block someone?",
          answer: "If you need to block someone, you can report their message and our team will investigate. We can block users from sending further messages if they violate our guidelines. You can also control your privacy settings to limit who can send you messages."
        }
      ]
    },
    {
      title: "Sharing & Social Media",
      icon: <MessageCircle className="h-6 w-6" />,
      items: [
        {
          question: "How do I share my link on Instagram?",
          answer: "Copy your personal Anon Uplift link and paste it in your Instagram bio. You can also share it in your Instagram stories or posts. The link will be clickable and take visitors directly to your message form. You can update your bio anytime with the link."
        },
        {
          question: "How do I share my link on TikTok?",
          answer: "Add your Anon Uplift link to your TikTok bio, or include it in your video descriptions. You can also mention it in your videos to encourage followers to send you anonymous messages. The link will be clickable and accessible to anyone who visits your profile."
        },
        {
          question: "Can I share beautiful message cards?",
          answer: "Yes! Every message you receive can be shared as a beautiful, customizable card on social media. Simply click the 'Share Card' button on any message to generate a shareable image. This is a great way to spread positivity and encourage others to join Anon Uplift."
        },
        {
          question: "What's the best way to get more messages?",
          answer: "The more you share your link, the more messages you'll receive! Post it in your social media bios, share it in stories, mention it in posts, and send it directly to friends. You can also encourage others to share their links so you can send them anonymous messages too."
        }
      ]
    }
  ];

  const filteredSections = searchTerm 
    ? helpSections.map(section => ({
        ...section,
        items: section.items.filter(item => 
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(section => section.items.length > 0)
    : helpSections;

  return (
    <>
      <Head>
        <title>Help Center - Anon Uplift | Get Help & Support</title>
        <meta name="description" content="Get help with Anon Uplift. Find guides, tutorials, and support for using our anonymous messaging platform safely and effectively." />
        <meta name="keywords" content="help, support, guide, tutorial, Anon Uplift, anonymous messaging" />
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
            <BookOpen className="h-20 w-20 text-pink-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find guides, tutorials, and answers to help you get the most out of Anon Uplift
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories Overview */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Help Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {helpSections.map((section) => (
                <div key={section.title} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-pink-500 mb-4 flex justify-center">
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{section.title}</h3>
                  <p className="text-sm text-gray-600">
                    {section.items.length} guides
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Content */}
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              {searchTerm ? `Search Results for "${searchTerm}"` : 'All Help Topics'}
            </h2>
            
            {filteredSections.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No help topics found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or browse all help topics below
                </p>
                <Button 
                  onClick={() => setSearchTerm('')}
                  variant="outline"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredSections.map((section) => (
                  <div key={section.title} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.title)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-inset"
                      aria-expanded={expandedSections.has(section.title)}
                      aria-controls={`help-section-${section.title}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-pink-500">
                          {section.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.items.length} guides available</p>
                        </div>
                      </div>
                      {expandedSections.has(section.title) ? (
                        <ChevronUp className="h-6 w-6 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedSections.has(section.title) && (
                      <div 
                        id={`help-section-${section.title}`}
                        className="px-8 pb-6"
                        role="region"
                        aria-labelledby={`help-section-title-${section.title}`}
                      >
                        <div className="border-t border-gray-200 pt-6 space-y-4">
                          {section.items.map((item, index) => (
                            <div key={`${section.title}-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => toggleItem(`${section.title}-${index}`)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-inset"
                                aria-expanded={expandedItems.has(`${section.title}-${index}`)}
                                aria-controls={`help-item-${section.title}-${index}`}
                              >
                                <h4 className="text-lg font-medium text-gray-900">{item.question}</h4>
                                {expandedItems.has(`${section.title}-${index}`) ? (
                                  <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                )}
                              </button>
                              
                              {expandedItems.has(`${section.title}-${index}`) && (
                                <div 
                                  id={`help-item-${section.title}-${index}`}
                                  className="px-6 pb-4"
                                  role="region"
                                  aria-labelledby={`help-item-title-${section.title}-${index}`}
                                >
                                  <div className="border-t border-gray-200 pt-4">
                                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
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
            <h2 className="text-3xl font-bold text-white mb-6">Need more help?</h2>
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
