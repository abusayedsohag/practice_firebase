// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3yvCSs-sTkMoNonpSYMrYc-15QElzQkc",
  authDomain: "email-pass-auth-c8ea7.firebaseapp.com",
  projectId: "email-pass-auth-c8ea7",
  storageBucket: "email-pass-auth-c8ea7.firebasestorage.app",
  messagingSenderId: "411263782370",
  appId: "1:411263782370:web:7830fda9ab5c847ceafdbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);