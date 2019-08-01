import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import firebase from "firebase/app";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDING,
  FIREBASE_APP_ID
} from '../config';

// Your web app's Firebase configuration
function loadFirebase() {
  try {
    const firebaseConfig = {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DATABASE_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDING,
      appId: FIREBASE_APP_ID
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    if (!/already exists/.test(error.message)) {
      console.log(`Firebase didn't initialize correctly: ${error.message}`);
    }
    // console.log(error)
  }
  return firebase;
}

export const myFirebase = loadFirebase();
