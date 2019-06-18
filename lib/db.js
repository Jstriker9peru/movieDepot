import firebase from 'firebase/app';

  // Your web app's Firebase configuration
export function loadFirebase() {
  try {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDING,
      appId: process.env.FIREBASE_API_ID
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    if (!/already exists/.test(error.message)) {
      console.log(`Firebase didn't initialize correctly: ${error.message}`)
    }
  }
  return firebase; 
}  