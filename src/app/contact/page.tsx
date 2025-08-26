'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, Mail, MessageCircle, Clock, MapPin, Send, Phone, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import Head from 'next/head';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.subject && formData.message.trim();

  return (
    <>
      <Head>
        <title>Contact Us - Anon Uplift | Get in Touch</title>
        <meta name="description" content="Contact Anon Uplift support team. Get help, report issues, or share feedback about our anonymous messaging platform." />
        <meta name="keywords" content="contact, support, help, feedback, Anon Uplift, customer service" />
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
            <Mail className="h-20 w-20 text-pink-500 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              We're here to help!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Have a question or feedback? Reach out anytime. Our support team is ready to assist you.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 bg-green-400 rounded-full flex items-center justify-center">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-green-800">Message sent successfully!</h3>
                    <p className="text-green-700">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
                    <p className="text-red-700">Please try again or contact us directly at support@anonuplift.com</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Account Issue">Account Issue</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Privacy Concern">Privacy Concern</option>
                    <option value="Safety Report">Safety Report</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {/* Alternative Contact */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Prefer to email directly?</p>
              <a 
                href="mailto:support@anonuplift.com" 
                className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-medium"
              >
                <Mail className="h-5 w-5" />
                <span>support@anonuplift.com</span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Answers</h2>
            <p className="text-xl text-gray-600 mb-8">
              Check our FAQ for instant answers to common questions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-left">
                <h3 className="font-semibold text-gray-900 mb-2">How do I reset my password?</h3>
                <p className="text-gray-600 text-sm">Use the 'Forgot Password' link on the sign-in page to receive a reset email.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Can I change my username?</h3>
                <p className="text-gray-600 text-sm">Yes, you can change your username from your account settings once per month.</p>
              </div>
            </div>
            <Link href="/faq">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View All FAQs
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-pink-500">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Need immediate help?</h2>
            <p className="text-xl text-pink-100 mb-8">
              Check our help center for step-by-step guides and tutorials
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/help">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-pink-600 hover:bg-gray-100">
                  Help Center
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
