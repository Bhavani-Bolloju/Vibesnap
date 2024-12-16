/* eslint-disable @typescript-eslint/no-unused-vars */

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyBkURbWNWOJLqqI1bSzxtpUxubMFI0OkQw",
  // authDomain: "vibesnap-161224.firebaseapp.com",
  // projectId: "vibesnap-161224",
  // storageBucket: "vibesnap-161224.firebasestorage.app",
  // messagingSenderId: "485226673264",
  // appId: "1:485226673264:web:2de8269356821dccf5b0b5"

  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const storage = getStorage(app);

