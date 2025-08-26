import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ClientSessionProvider from '@/components/ClientSessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anon Uplift - Anonymous Positive Messages',
  description: 'Send and receive anonymous compliments, encouragement, gratitude, and fun dares. Only positive vibes allowed! ✨',
  keywords: 'anonymous, messages, compliments, encouragement, gratitude, positive, uplifting, social media',
  authors: [{ name: 'Anon Uplift Team' }],
  creator: 'Anon Uplift',
  publisher: 'Anon Uplift',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://anonuplift.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Anon Uplift - Anonymous Positive Messages',
    description: 'Send and receive anonymous compliments, encouragement, gratitude, and fun dares. Only positive vibes allowed! ✨',
    url: 'https://anonuplift.com',
    siteName: 'Anon Uplift',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anon Uplift - Anonymous Positive Messages',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anon Uplift - Anonymous Positive Messages',
    description: 'Send and receive anonymous compliments, encouragement, gratitude, and fun dares. Only positive vibes allowed! ✨',
    images: ['/og-image.jpg'],
    creator: '@anonuplift',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider session={session}>
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  )
}
