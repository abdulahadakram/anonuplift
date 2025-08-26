'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, Shield, Lock, Eye, Database, Calendar, Globe, FileText } from 'lucide-react';
import Head from 'next/head';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Anon Uplift | Data Protection & Privacy</title>
        <meta name="description" content="Learn how Anon Uplift protects your privacy and handles your data. Our comprehensive privacy policy ensures GDPR and CCPA compliance." />
        <meta name="keywords" content="privacy policy, data protection, GDPR, CCPA, Anon Uplift, privacy rights" />
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
            <Shield className="h-20 w-20 text-pink-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your privacy is our priority. Learn how we protect your data and respect your rights.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <Lock className="h-4 w-4" />
                <span className="text-sm font-medium">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">CCPA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                <Database className="h-4 w-4" />
                <span className="text-sm font-medium">Data Protected</span>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Overview */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Privacy Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <Lock className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Your Data is Safe</h3>
                <p className="text-gray-600 text-sm">We use industry-standard encryption and never sell your personal information to third parties.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <Eye className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Full Transparency</h3>
                <p className="text-gray-600 text-sm">We're clear about what data we collect, how we use it, and your rights to control it.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Global Standards</h3>
                <p className="text-gray-600 text-sm">We comply with international privacy laws including GDPR and CCPA.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Details */}
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Privacy Details</h2>
            
            <div className="space-y-12">
              {/* Introduction */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Anon Uplift, we believe privacy is a fundamental human right. This Privacy Policy explains how we collect, use, and protect your information when you use our anonymous messaging platform. We are committed to transparency and giving you control over your personal data.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This policy applies to all users of Anon Uplift, regardless of where you are located. By using our service, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Account Information</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Email address (for account creation and verification)</li>
                      <li>Username (chosen by you)</li>
                      <li>Account creation date and last login information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Message Content</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Anonymous messages sent to users (filtered for safety)</li>
                      <li>Message categories and timestamps</li>
                      <li>IP address hashes for abuse prevention (not linked to individuals)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Usage Data</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Pages visited and features used</li>
                      <li>Device information (browser type, operating system)</li>
                      <li>Performance and error logs (anonymized)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Providing Our Service</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Creating and managing your account</li>
                      <li>Delivering anonymous messages to your inbox</li>
                      <li>Maintaining your personal Anon Uplift link</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Safety & Security</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Filtering inappropriate content using AI and human moderation</li>
                      <li>Preventing abuse and harassment</li>
                      <li>Investigating reported violations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Service Improvement</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Analyzing usage patterns to improve features</li>
                      <li>Fixing bugs and technical issues</li>
                      <li>Developing new functionality</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sharing of Information */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sharing of Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>We never sell your personal information.</strong> We may share information only in these limited circumstances:
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Service Providers</h4>
                    <p className="text-gray-700">We work with trusted third-party services (like Firebase for hosting and Cloudflare for security) that help us operate our platform. These providers are bound by strict data protection agreements.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Legal Requirements</h4>
                    <p className="text-gray-700">We may disclose information if required by law, court order, or government request, but only to the extent necessary and permitted by applicable law.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Safety & Protection</h4>
                    <p className="text-gray-700">We may share information to protect the safety of our users, prevent fraud, or address security threats, always prioritizing user privacy.</p>
                  </div>
                </div>
              </div>

              {/* Cookies & Tracking */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cookies & Tracking</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use essential cookies to make our service work properly. These cookies are necessary for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                  <li>Maintaining your login session</li>
                  <li>Remembering your preferences</li>
                  <li>Ensuring security and preventing fraud</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We do not use tracking cookies, advertising cookies, or any third-party analytics that could identify you personally. You can control cookie settings in your browser preferences.
                </p>
              </div>

              {/* Your Privacy Rights */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">GDPR Rights (EU Users)</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li><strong>Access:</strong> Request a copy of your personal data</li>
                      <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                      <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                      <li><strong>Portability:</strong> Receive your data in a structured format</li>
                      <li><strong>Objection:</strong> Object to processing of your data</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">CCPA Rights (California Users)</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li><strong>Know:</strong> Learn what personal information we collect</li>
                      <li><strong>Delete:</strong> Request deletion of your personal information</li>
                      <li><strong>Opt-out:</strong> Opt out of the "sale" of personal information</li>
                      <li><strong>Non-discrimination:</strong> Equal service regardless of privacy choices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">How to Exercise Your Rights</h4>
                    <p className="text-gray-700">Contact us at <a href="mailto:support@anonuplift.com" className="text-pink-600 hover:text-pink-700">support@anonuplift.com</a> to exercise any of these rights. We will respond within 30 days and may need to verify your identity for security purposes.</p>
                  </div>
                </div>
              </div>

              {/* Children's Privacy */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Anon Uplift is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to remove such information and terminate the child's account.
                </p>
              </div>

              {/* Data Retention & Security */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention & Security</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Data Retention</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Account data: Retained while your account is active</li>
                      <li>Messages: Stored until you delete your account</li>
                      <li>Logs: Automatically deleted after 90 days</li>
                      <li>Backup data: Retained for up to 30 days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Security Measures</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>End-to-end encryption for all data transmission</li>
                      <li>Secure data centers with physical and digital security</li>
                      <li>Regular security audits and penetration testing</li>
                      <li>Employee training on data protection and privacy</li>
                      <li>Incident response procedures for data breaches</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Changes to Policy */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending an email notification to your registered email address</li>
                  <li>Displaying a prominent notice on our platform</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Your continued use of Anon Uplift after any changes indicates your acceptance of the updated policy.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:support@anonuplift.com" className="text-pink-600 hover:text-pink-700">support@anonuplift.com</a></p>
                  <p className="text-gray-700"><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 48 hours</p>
                  <p className="text-gray-700"><strong>Data Protection Officer:</strong> Available for EU users upon request</p>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4">
                  You also have the right to lodge a complaint with your local data protection authority if you believe we have not addressed your privacy concerns adequately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-pink-500">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Questions about privacy?</h2>
            <p className="text-xl text-pink-100 mb-8">
              Our support team is here to help with any privacy concerns
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/terms">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-pink-600 hover:bg-gray-100">
                  View Terms of Service
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
