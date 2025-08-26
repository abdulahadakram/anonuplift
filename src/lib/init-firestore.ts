import { db } from './firebase';

// Initialize Firestore collections for Auth.js
export async function initializeFirestore() {
  if (!db) {
    console.warn('Firebase not initialized, skipping collection setup');
    return;
  }

  try {
    console.log('🔄 Initializing Firestore collections...');
    
    // Create collections if they don't exist
    const collections = ['users', 'accounts', 'sessions', 'verification_tokens'];
    
    for (const collectionName of collections) {
      try {
        // Try to create a dummy document to ensure collection exists
        const docRef = db.collection(collectionName).doc('_init');
        await docRef.set({ 
          _created: new Date(),
          _purpose: 'Collection initialization'
        });
        
        // Delete the dummy document
        await docRef.delete();
        
        console.log(`✅ Collection '${collectionName}' initialized`);
      } catch (error) {
        console.warn(`⚠️  Could not initialize collection '${collectionName}':`, error);
      }
    }
    
    console.log('🎉 Firestore collections initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Firestore collections:', error);
  }
}

// Initialize collections when this module is imported
if (typeof window === 'undefined') {
  // Only run on server side
  initializeFirestore().catch(console.error);
}
