'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Filter, Download, Share2, Trash2, Flag, LogOut, User, Settings } from 'lucide-react';
import { MessageDoc, MessageCategory } from '@/types';
import Link from 'next/link';

export default function InboxPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<MessageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory | 'all'>('all');
  const [filteredMessages, setFilteredMessages] = useState<MessageDoc[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  // Fetch messages when authenticated
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchMessages();
    }
  }, [status, session]);

  // Filter messages when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredMessages(messages);
    } else {
      setFilteredMessages(messages.filter(msg => msg.category === selectedCategory));
    }
  }, [selectedCategory, messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const response = await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, deleted: true }),
      });
      
      if (response.ok) {
        setMessages(messages.filter(msg => msg.id !== messageId));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleReportMessage = async (messageId: string) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, reported: true }),
      });
      
      if (response.ok) {
        alert('Message reported successfully');
      }
    } catch (error) {
      console.error('Error reporting message:', error);
    }
  };

  const handleShareCard = (messageId: string) => {
    router.push(`/share/${messageId}`);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const getCategoryIcon = (category: MessageCategory) => {
    switch (category) {
      case 'compliment': return '💝';
      case 'encouragement': return '💪';
      case 'gratitude': return '🙏';
      case 'fun_dare': return '🎯';
      default: return '💌';
    }
  };

  const getCategoryColor = (category: MessageCategory) => {
    switch (category) {
      case 'compliment': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'encouragement': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'gratitude': return 'bg-green-100 text-green-800 border-green-200';
      case 'fun_dare': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCategoryName = (category: MessageCategory) => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

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
      {/* User Dashboard Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold text-gray-900">Anon Uplift</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 bg-pink-50 rounded-full px-4 py-2">
                <User className="h-4 w-4 text-pink-600" />
                <span className="text-sm font-medium text-pink-800">
                  @{session?.user?.username || 'user'}
                </span>
              </div>
              
              {/* Navigation Links */}
              <Link href="/settings">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              
              {/* Logout Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="h-16 w-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Inbox</h1>
          <p className="text-gray-600">Anonymous messages from people who care about you</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-2xl font-bold text-gray-900">{messages.length}</div>
            <div className="text-gray-600">Total Messages</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-2xl font-bold text-pink-600">
              {messages.filter(m => m.category === 'compliment').length}
            </div>
            <div className="text-gray-600">Compliments</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-2xl font-bold text-blue-600">
              {messages.filter(m => m.category === 'encouragement').length}
            </div>
            <div className="text-gray-600">Encouragement</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600">
              {messages.filter(m => m.category === 'gratitude').length}
            </div>
            <div className="text-gray-600">Gratitude</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 mr-2 text-gray-600" />
            <h2 className="text-lg font-semibold">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['all', 'compliment', 'encouragement', 'gratitude', 'fun_dare'] as const).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-pink-500 hover:bg-pink-600' : ''}
              >
                {category === 'all' ? 'All' : formatCategoryName(category as MessageCategory)}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading messages...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
              <p className="text-gray-600 mb-4">
                {selectedCategory === 'all' 
                  ? "Share your link to start receiving anonymous messages!"
                  : `No ${selectedCategory === 'all' ? '' : formatCategoryName(selectedCategory as MessageCategory)} messages yet.`
                }
              </p>
              {session?.user?.username && (
                <Button
                  onClick={() => {
                    const url = `${window.location.origin}/u/${session.user.username}`;
                    navigator.clipboard.writeText(url);
                    alert('Link copied to clipboard!');
                  }}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  Copy Your Link
                </Button>
              )}
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div key={message.id} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(message.category)}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(message.category)}`}>
                      {formatCategoryName(message.category)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShareCard(message.id)}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Card
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReportMessage(message.id)}
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMessage(message.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-gray-800 text-lg leading-relaxed mb-4">
                    {message.content}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Received {new Date(message.createdAt).toLocaleDateString()}</span>
                  <span>From: Anonymous</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
