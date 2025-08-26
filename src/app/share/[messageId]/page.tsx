'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Download, Share2, ArrowLeft, Copy, Check } from 'lucide-react';
import { MessageDoc } from '@/types';

export default function ShareCardPage({ params }: { params: { messageId: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState<MessageDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (status === 'authenticated' && session?.user?.id) {
      fetchMessage();
    }
  }, [status, session, router]);

  const fetchMessage = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/messages/fetch/${params.messageId}`);
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        console.error('Failed to fetch message');
        router.push('/inbox');
      }
    } catch (error) {
      console.error('Error fetching message:', error);
      router.push('/inbox');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliment': return '💝';
      case 'encouragement': return '💪';
      case 'gratitude': return '🙏';
      case 'fun_dare': return '🎯';
      default: return '💌';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'compliment': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'encouragement': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'gratitude': return 'bg-green-100 text-green-800 border-green-200';
      case 'fun_dare': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCategoryName = (category: string) => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatFirebaseTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    
    // Handle Firebase timestamp object
    if (timestamp._seconds) {
      return new Date(timestamp._seconds * 1000).toLocaleDateString();
    }
    
    // Handle regular Date object or timestamp
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString();
    }
    
    // Handle timestamp number
    if (typeof timestamp === 'number') {
      return new Date(timestamp).toLocaleDateString();
    }
    
    // Handle string date
    if (typeof timestamp === 'string') {
      return new Date(timestamp).toLocaleDateString();
    }
    
    return 'Unknown date';
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      // For now, we'll use a simple approach
      // In production, you'd want to use html-to-image or similar
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = 800;
      canvas.height = 600;
      
      // Create a simple image representation
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 800, 600);
        
        // Add text
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Share Card', 400, 100);
        
        if (message) {
          ctx.font = '24px Arial';
          ctx.fillText(message.content.substring(0, 50) + '...', 400, 200);
        }
      }
      
      // Download
      const link = document.createElement('a');
      link.download = `message-${params.messageId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading card:', error);
      alert('Download failed. Try taking a screenshot instead!');
    }
  };

  const handleShare = async () => {
    if (navigator.share && message) {
      try {
        await navigator.share({
          title: 'Anonymous Message',
          text: message.content,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying link
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Message not found</p>
          <Button onClick={() => router.push('/inbox')} className="mt-4">
            Back to Inbox
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => router.push('/inbox')}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Inbox
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Share Card</h1>
            <p className="text-gray-600">Create and share your message</p>
          </div>
          
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Share Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div
            ref={cardRef}
            className="bg-gradient-to-br from-pink-100 via-white to-blue-100 rounded-2xl p-8 border-4 border-white shadow-lg"
            style={{ minHeight: '500px' }}
          >
            {/* Card Header */}
            <div className="text-center mb-6">
              <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Anonymous Message</h2>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">{getCategoryIcon(message.category)}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(message.category)}`}>
                  {formatCategoryName(message.category)}
                </span>
              </div>
            </div>

            {/* Message Content */}
            <div className="text-center mb-6">
              <blockquote className="text-xl text-gray-800 leading-relaxed italic">
                "{message.content}"
              </blockquote>
            </div>

            {/* Card Footer */}
            <div className="text-center text-gray-600">
              <p className="text-sm">Received on {formatFirebaseTimestamp(message.createdAt)}</p>
              <p className="text-sm mt-1">via Anon Uplift</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDownload}
            className="flex items-center bg-green-600 hover:bg-green-700"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Card
          </Button>
          
          <Button
            onClick={handleShare}
            className="flex items-center bg-blue-600 hover:bg-blue-700"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </Button>
          
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="flex items-center"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 mr-2 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5 mr-2" />
                Copy Link
              </>
            )}
          </Button>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            💡 <strong>Tip:</strong> Right-click on the card above and select "Save image as..." 
            to download it as a picture!
          </p>
        </div>
      </div>
    </div>
  );
}
