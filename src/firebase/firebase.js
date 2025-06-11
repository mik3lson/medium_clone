// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "fir-blog-e1440.firebaseapp.com",
  projectId: "fir-blog-e1440",
  storageBucket: "fir-blog-e1440.firebasestorage.app",
  messagingSenderId: "986863302682",
  appId: "1:986863302682:web:ebea665bf4b340c78479a3",
  measurementId: "G-3PK62D7KX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage()
export const db = getFirestore()