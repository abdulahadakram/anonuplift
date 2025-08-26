# Anon Uplift - Anonymous Positive Messaging App

A one-day MVP for anonymous positive messaging with safety features and social sharing capabilities.

## 🚀 Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo>
   cd anonuplift
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Fill in your Firebase, Auth.js, and other service credentials
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔥 Firestore Setup

### Required Collections
The app automatically creates these collections when needed:
- `users` - User profiles and usernames
- `accounts` - OAuth account connections
- `sessions` - User sessions
- `verification_tokens` - Email verification
- `messages` - Anonymous messages

### Performance Indexes (Optional)
For better performance with large message volumes, you can create a composite index:

**Option 1: Use Firebase Console**
1. Go to [Firebase Console > Firestore > Indexes](https://console.firebase.google.com/project/_/firestore/indexes)
2. Click "Create Index"
3. Collection ID: `messages`
4. Fields: `recipientId` (Ascending), `deleted` (Ascending), `createdAt` (Descending)

**Option 2: Use Firebase CLI**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and select project
firebase login
firebase use anonuplift

# Deploy indexes
firebase deploy --only firestore:indexes
```

**Option 3: Manual Index Creation**
Use the provided `firestore.indexes.json` file:
1. Go to the Firebase Console
2. Navigate to Firestore > Indexes
3. Click "Import" and select the `firestore.indexes.json` file

## 🌟 Features

### Core Functionality
- **Anonymous Messaging**: Send positive messages to any user
- **Message Categories**: Compliment, Encouragement, Gratitude, Fun Dare
- **User Inbox**: View and manage received messages
- **Share Cards**: Generate beautiful image cards for social media
- **Safety Features**: Profanity filtering, rate limiting, abuse reporting

### Authentication
- **Facebook OAuth**: Quick social login
- **Email Magic Links**: Passwordless email authentication
- **Session Management**: Secure JWT-based sessions

### Safety & Moderation
- **Profanity Filter**: Blocks inappropriate content
- **Rate Limiting**: Prevents spam (5 messages/10 min per IP/recipient)
- **Cloudflare Turnstile**: Captcha protection
- **Abuse Reporting**: Users can report problematic messages

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS + shadcn/ui + lucide-react
- **Authentication**: Auth.js (NextAuth) with FirestoreAdapter
- **Database**: Firebase Firestore
- **Rate Limiting**: Upstash Redis + in-memory fallback
- **Content Filtering**: leo-profanity
- **Captcha**: Cloudflare Turnstile
- **Analytics**: PostHog
- **Deployment**: Vercel + Firebase

## 📱 Pages & Routes

- `/` - Landing page with app introduction
- `/signin` - Authentication page
- `/onboarding` - Username setup for new users
- `/u/[username]` - Public sender page for anonymous messages
- `/inbox` - User's message inbox (authenticated)
- `/share/[messageId]` - Share card generation page
- `/settings` - User account settings

## 🔧 API Endpoints

- `POST /api/messages/[username]` - Submit anonymous message
- `GET /api/messages` - Fetch user's messages
- `PATCH /api/messages` - Update message (delete/report)
- `GET /api/messages/fetch/[id]` - Fetch single message
- `POST /api/username` - Create/update username
- `GET /api/username/check` - Check username availability
- `GET /api/me` - Get current user info

## 🚨 Troubleshooting

### Common Issues

**1. Profanity Filter Errors**
- The app gracefully handles missing `leo-profanity` package
- Check console for warnings about profanity filtering

**2. Firestore Index Errors**
- Current implementation filters in memory to avoid index requirements
- For production, create the composite index using the methods above

**3. Authentication Issues**
- Ensure all environment variables are set in `.env.local`
- Check Firebase service account permissions
- Verify Auth.js configuration

**4. Rate Limiting Errors**
- Redis connection issues fall back to in-memory storage
- Check Upstash Redis credentials

## 📊 Environment Variables

```bash
# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Auth.js
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret

# Email (SMTP)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password

# Cloudflare Turnstile
TURNSTILE_SECRET_KEY=your-turnstile-secret

# Upstash Redis
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
POSTHOG_HOST=https://app.posthog.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
IP_SALT=your-ip-hash-salt
```

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set all environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Firebase Deployment
```bash
# Deploy Firestore rules and indexes
firebase deploy --only firestore:rules,firestore:indexes
```

## 📈 Analytics & Monitoring

The app tracks key user actions via PostHog:
- User registration and login
- Message submissions
- Share card generation
- Settings changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section above
2. Review Firebase Console logs
3. Check browser console for client-side errors
4. Open an issue with detailed error information

---

**Built with ❤️ for spreading positivity anonymously!**
