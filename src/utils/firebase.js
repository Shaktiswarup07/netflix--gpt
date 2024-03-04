// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8DQ-KI3QCeLqxqgQbVtxfKAlbvt99Ijg",
  authDomain: "netflixgpt-b14f8.firebaseapp.com",
  projectId: "netflixgpt-b14f8",
  storageBucket: "netflixgpt-b14f8.appspot.com",
  messagingSenderId: "607840454465",
  appId: "1:607840454465:web:4c610dec15f19e189143c0",
  measurementId: "G-80EZ3MVK41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
