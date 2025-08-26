'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, FileText, Scale, Shield, Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Head from 'next/head';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service - Anon Uplift | User Agreement & Terms</title>
        <meta name="description" content="Read Anon Uplift's Terms of Service. Understand your rights and responsibilities when using our anonymous messaging platform." />
        <meta name="keywords" content="terms of service, user agreement, terms, Anon Uplift, legal" />
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
            <FileText className="h-20 w-20 text-pink-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Please read these terms carefully. They govern your use of Anon Uplift and outline your rights and responsibilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <Scale className="h-4 w-4" />
                <span className="text-sm font-medium">Legal Agreement</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">User Protection</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Last Updated: Jan 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Overview */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Terms Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <Users className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900">User Rights</h3>
                <p className="text-gray-600 text-sm">Understand what you can expect from our service and your rights as a user.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Safety & Security</h3>
                <p className="text-gray-600 text-sm">Learn about our safety measures and content policies to protect all users.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <AlertTriangle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Responsibilities</h3>
                <p className="text-gray-600 text-sm">Know your responsibilities and what behavior is expected on our platform.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Details */}
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Terms Details</h2>
            
            <div className="space-y-12">
              {/* Acceptance of Terms */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By accessing or using Anon Uplift ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  These Terms constitute a legally binding agreement between you and Anon Uplift. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting on our website.
                </p>
              </div>

              {/* Eligibility */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Age Requirements</h4>
                    <p className="text-gray-700">You must be at least 13 years old to use Anon Uplift. If you are under 18, you represent that you have parental or guardian consent to use the Service.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Legal Capacity</h4>
                    <p className="text-gray-700">You must have the legal capacity to enter into these Terms. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Geographic Restrictions</h4>
                    <p className="text-gray-700">The Service is available worldwide, but you must comply with all applicable local laws and regulations in your jurisdiction.</p>
                  </div>
                </div>
              </div>

              {/* User Accounts */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Account Creation</h4>
                    <p className="text-gray-700">To use certain features of the Service, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Account Security</h4>
                    <p className="text-gray-700">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Account Termination</h4>
                    <p className="text-gray-700">You may terminate your account at any time. We may suspend or terminate your account if you violate these Terms or for any other reason at our sole discretion.</p>
                  </div>
                </div>
              </div>

              {/* Use of Service */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Use of Service</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Permitted Uses</h4>
                    <p className="text-gray-700">You may use the Service to send anonymous positive messages to other users, receive anonymous messages, and share your personal Anon Uplift link with others.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Prohibited Uses</h4>
                    <p className="text-gray-700">You may not use the Service to:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
                      <li>Send harmful, threatening, or inappropriate content</li>
                      <li>Impersonate others or misrepresent your identity</li>
                      <li>Attempt to reverse-engineer or hack the Service</li>
                      <li>Use automated tools to send messages</li>
                      <li>Violate any applicable laws or regulations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Service Availability</h4>
                    <p className="text-gray-700">We strive to provide reliable service but cannot guarantee uninterrupted availability. We may temporarily suspend the Service for maintenance, updates, or other operational reasons.</p>
                  </div>
                </div>
              </div>

              {/* Content Policy */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">5. Content Policy</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Message Standards</h4>
                    <p className="text-gray-700">All messages must be positive, uplifting, and appropriate. We only allow messages in these categories: Compliments, Encouragement, Gratitude, and Fun Dares.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Content Filtering</h4>
                    <p className="text-gray-700">We use AI-powered filtering and human moderation to ensure all content meets our standards. Messages that violate our policies will be automatically blocked or removed.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Reporting Violations</h4>
                    <p className="text-gray-700">If you receive inappropriate content, you can report it immediately. We review all reports and take appropriate action, including account suspension for repeat violations.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Zero Tolerance</h4>
                    <p className="text-gray-700">We have a zero-tolerance policy for harassment, bullying, hate speech, or any form of harmful content. Violators will be permanently banned from the Service.</p>
                  </div>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Our Rights</h4>
                    <p className="text-gray-700">Anon Uplift and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Your Content</h4>
                    <p className="text-gray-700">You retain ownership of the messages you send, but you grant us a license to store, display, and moderate your content as necessary to provide the Service.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">License to Use</h4>
                    <p className="text-gray-700">We grant you a limited, non-exclusive, non-transferable license to use the Service for personal, non-commercial purposes in accordance with these Terms.</p>
                  </div>
                </div>
              </div>

              {/* Termination */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">7. Termination</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Your Right to Terminate</h4>
                    <p className="text-gray-700">You may terminate your account at any time by contacting our support team or using the account deletion feature in your settings.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Our Right to Terminate</h4>
                    <p className="text-gray-700">We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Effect of Termination</h4>
                    <p className="text-gray-700">Upon termination, your right to use the Service ceases immediately. We will delete your account data within 30 days, except where we are required to retain information by law.</p>
                  </div>
                </div>
              </div>

              {/* Disclaimers & Limitation of Liability */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimers & Limitation of Liability</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Service "As Is"</h4>
                    <p className="text-gray-700">The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the Service will be error-free or uninterrupted.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Limitation of Liability</h4>
                    <p className="text-gray-700">To the maximum extent permitted by law, Anon Uplift shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Maximum Liability</h4>
                    <p className="text-gray-700">Our total liability to you for any claims arising from these Terms or your use of the Service shall not exceed the amount you paid us, if any, in the 12 months preceding the claim.</p>
                  </div>
                </div>
              </div>

              {/* Governing Law */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">9. Governing Law & Disputes</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Governing Law</h4>
                    <p className="text-gray-700">These Terms shall be governed by and construed in accordance with the laws of Delaware, United States, without regard to its conflict of law provisions.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Dispute Resolution</h4>
                    <p className="text-gray-700">Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Class Action Waiver</h4>
                    <p className="text-gray-700">You agree to resolve disputes individually and waive any right to participate in a class action lawsuit or class-wide arbitration.</p>
                  </div>
                </div>
              </div>

              {/* Changes to Terms */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update these Terms from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                  <li>Post the updated Terms on our website</li>
                  <li>Send you an email notification if the changes are material</li>
                  <li>Update the "Last Updated" date at the top of these Terms</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Your continued use of the Service after any changes indicates your acceptance of the updated Terms. If you disagree with any changes, you must stop using the Service and terminate your account.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:support@anonuplift.com" className="text-pink-600 hover:text-pink-700">support@anonuplift.com</a></p>
                  <p className="text-gray-700"><strong>Response Time:</strong> We aim to respond to all legal inquiries within 48 hours</p>
                  <p className="text-gray-700"><strong>Legal Department:</strong> Available for formal legal matters and disputes</p>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4">
                  For urgent legal matters, please include "URGENT LEGAL MATTER" in your email subject line.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-pink-500">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Questions about these terms?</h2>
            <p className="text-xl text-pink-100 mb-8">
              Our support team is here to help clarify any legal questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/privacy">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-pink-600 hover:bg-gray-100">
                  View Privacy Policy
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
