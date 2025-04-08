// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-481d6.firebaseapp.com",
  projectId: "mern-blog-app-481d6",
  storageBucket: "mern-blog-app-481d6.firebasestorage.app",
  messagingSenderId: "797666250417",
  appId: "1:797666250417:web:6ecb57495066134be55c90"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);