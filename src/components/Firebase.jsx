// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWLZXpi7KvRMiNJH-Ri96kMPL9_OX1Oaw",
  authDomain: "value-bazar.firebaseapp.com",
  databaseURL: "https://value-bazar-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "value-bazar",
  storageBucket: "value-bazar.firebasestorage.app",
  messagingSenderId: "157751805314",
  appId: "1:157751805314:web:6009b120c8a784e5f03b9b"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const database = getDatabase(app);
