import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin if not already initialized
if (!getApps().length && process.env.FIREBASE_PROJECT_ID) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

export let db: any = null;

// Initialize Firestore only if Firebase is properly initialized
try {
  if (getApps().length > 0) {
    db = getFirestore();
  }
} catch (error) {
  console.warn('Firestore initialization failed:', error);
}

// Collection references - only available when db is initialized
export const usersCollection = db?.collection('users');
export const usernamesCollection = db?.collection('usernames');
export const messagesCollection = db?.collection('messages');

// Initialize Firestore collections for Auth.js (temporarily disabled)
// if (db) {
//   import('./init-firestore').catch(console.error);
// }

// Helper functions
export const getUserByUsername = async (username: string) => {
  if (!db || !usernamesCollection || !usersCollection) {
    throw new Error('Firebase not initialized');
  }
  
  console.log('=== DEBUG: getUserByUsername ===');
  console.log('Looking up username:', username);
  
  const usernameDoc = await usernamesCollection.doc(username).get();
  console.log('Username doc exists:', usernameDoc.exists);
  
  if (!usernameDoc.exists) return null;
  
  const usernameData = usernameDoc.data();
  console.log('Username doc data:', usernameData);
  
  let uid = usernameData?.uid;
  console.log('UID extracted from username doc:', uid);
  console.log('UID type:', typeof uid);
  
  // If uid is an email, we need to find the actual Firebase UID
  if (uid && uid.includes('@')) {
    console.log('UID is an email, looking up actual Firebase UID...');
    console.log('Searching for user with email:', uid);
    
    // First, check if a user document with this UID already exists
    const existingUserDoc = await usersCollection.doc(uid).get();
    if (existingUserDoc.exists) {
      console.log('User document exists with UID, checking if it has email field...');
      const userData = existingUserDoc.data();
      
      // If user document exists but is missing email field, add it
      if (!userData?.email) {
        console.log('User document missing email field, adding it...');
        try {
          await usersCollection.doc(uid).update({ 
            email: uid,
            updatedAt: new Date()
          });
          console.log('Added missing email field to user document');
        } catch (error) {
          console.error('Failed to add email field:', error);
        }
      }
      
      // Use the existing UID
      console.log('Using existing user document with UID:', uid);
    } else {
      // Search for user document with this email in other fields
      const usersSnapshot = await usersCollection.where('email', '==', uid).limit(1).get();
      console.log('Users found with email:', usersSnapshot.size);
      
      if (!usersSnapshot.empty) {
        const userDoc = usersSnapshot.docs[0];
        uid = userDoc.id; // Use the document ID as the UID
        console.log('Found actual Firebase UID:', uid);
      } else {
        console.log('No user found with email, trying alternative fields...');
        
        // Try other common email field names
        const alternativeFields = ['emailAddress', 'userEmail', 'mail'];
        let found = false;
        
        for (const field of alternativeFields) {
          console.log(`Trying field: ${field}`);
          const altSnapshot = await usersCollection.where(field, '==', uid).limit(1).get();
          if (!altSnapshot.empty) {
            const userDoc = altSnapshot.docs[0];
            uid = userDoc.id;
            console.log(`Found user with field ${field}, UID:`, uid);
            found = true;
            break;
          }
        }
        
        if (!found) {
          console.log('No user found with any email field, creating missing user...');
          
          // Create a new user document with the email as the UID
          const newUid = uid; // Use email as UID for now
          const userData = {
            uid: newUid,
            email: uid,
            username: username,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          try {
            await usersCollection.doc(newUid).set(userData);
            console.log('Created missing user document with UID:', newUid);
            uid = newUid;
          } catch (error) {
            console.error('Failed to create user document:', error);
            return null;
          }
        }
      }
    }
  }
  
  if (!uid) return null;
  
  console.log('Returning user object with UID:', { uid });
  console.log('=== END DEBUG ===');
  
  // Return the UID directly, not the user document
  return { uid };
};

export const getUserDataByUsername = async (username: string) => {
  if (!db || !usernamesCollection || !usersCollection) {
    throw new Error('Firebase not initialized');
  }
  
  const usernameDoc = await usernamesCollection.doc(username).get();
  if (!usernameDoc.exists) return null;
  
  const uid = usernameDoc.data()?.uid;
  if (!uid) return null;
  
  const userDoc = await usersCollection.doc(uid).get();
  return userDoc.exists ? userDoc.data() : null;
};

export const getUserByUid = async (uid: string) => {
  if (!db || !usersCollection) {
    throw new Error('Firebase not initialized');
  }
  
  const userDoc = await usersCollection.doc(uid).get();
  return userDoc.exists ? userDoc.data() : null;
};

export const reserveUsername = async (username: string, uid: string) => {
  if (!db || !usernamesCollection || !usersCollection) {
    throw new Error('Firebase not initialized');
  }
  
  const batch = db.batch();
  
  // Reserve username
  batch.set(usernamesCollection.doc(username), { uid });
  
  // Create user document with proper structure
  const userData: any = {
    uid,
    username,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // If UID is an email, add it as a field
  if (uid.includes('@')) {
    userData.email = uid;
  }
  
  batch.set(usersCollection.doc(uid), userData);
  
  await batch.commit();
};

export const checkUsernameAvailability = async (username: string) => {
  if (!usernamesCollection) {
    throw new Error('Firebase not initialized');
  }
  
  const doc = await usernamesCollection.doc(username).get();
  return !doc.exists;
};

// Function to fix usernames collection data
export const fixUsernameData = async (username: string) => {
  if (!db || !usernamesCollection || !usersCollection) {
    throw new Error('Firebase not initialized');
  }
  
  console.log('=== FIXING USERNAME DATA ===');
  console.log('Username to fix:', username);
  
  const usernameDoc = await usernamesCollection.doc(username).get();
  if (!usernameDoc.exists) {
    console.log('Username document does not exist');
    return false;
  }
  
  const usernameData = usernameDoc.data();
  const currentUid = usernameData?.uid;
  
  console.log('Current UID in username doc:', currentUid);
  
  // If uid is an email, find the actual Firebase UID
  if (currentUid && currentUid.includes('@')) {
    console.log('UID is an email, looking up actual Firebase UID...');
    
    // Search for user document with this email
    const usersSnapshot = await usersCollection.where('email', '==', currentUid).limit(1).get();
    if (!usersSnapshot.empty) {
      const userDoc = usersSnapshot.docs[0];
      const actualUid = userDoc.id;
      
      console.log('Found actual Firebase UID:', actualUid);
      
      // Update the username document with the correct UID
      await usernamesCollection.doc(username).update({ uid: actualUid });
      
      console.log('Updated username document with correct UID');
      return true;
    } else {
      console.log('No user found with email:', currentUid);
      return false;
    }
  } else {
    console.log('UID is already correct or not an email');
    return true;
  }
};

// Function to fix existing user documents missing email field
export const fixUserDocuments = async () => {
  if (!db || !usersCollection) {
    throw new Error('Firebase not initialized');
  }
  
  console.log('=== FIXING USER DOCUMENTS ===');
  
  try {
    // Get all user documents
    const usersSnapshot = await usersCollection.get();
    console.log(`Found ${usersSnapshot.size} user documents`);
    
    let fixedCount = 0;
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const uid = userDoc.id;
      
      // Check if user document is missing email field but UID is an email
      if (!userData?.email && uid.includes('@')) {
        console.log(`Fixing user document ${uid} - adding missing email field`);
        
        try {
          await usersCollection.doc(uid).update({
            email: uid,
            updatedAt: new Date()
          });
          fixedCount++;
          console.log(`Fixed user document ${uid}`);
        } catch (error) {
          console.error(`Failed to fix user document ${uid}:`, error);
        }
      }
    }
    
    console.log(`Fixed ${fixedCount} user documents`);
    console.log('=== END FIXING USER DOCUMENTS ===');
    
    return fixedCount;
  } catch (error) {
    console.error('Error fixing user documents:', error);
    throw error;
  }
};
