import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Firebase configuration for your project
const firebaseConfig = {
  apiKey: "AIzaSyCE2J-zrBOmEV4q759cCbNBtGoENNIam9I",
  authDomain: "healthgo-e836a.firebaseapp.com",
  projectId: "healthgo-e836a",
  storageBucket: "healthgo-e836a.appspot.com",
  messagingSenderId: "817034777621",
  appId: "1:817034777621:web:d55a4711745b1580dcea1c",
  measurementId: "G-GXDWJYRPRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null; // Only initialize analytics on the client-side

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore Database
const db = getFirestore(app);

const storage = getStorage(app)

// Export the Firebase services for use in your application
export { app, analytics, auth, db, storage };
