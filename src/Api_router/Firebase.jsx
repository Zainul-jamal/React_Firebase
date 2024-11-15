import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBf4Gzk6WqYFAANtS1MN0XFnPH-vPRAmag",
    authDomain: "smittestptactice.firebaseapp.com",
    projectId: "smittestptactice",
    storageBucket: "smittestptactice.firebasestorage.app",
    messagingSenderId: "610819138046",
    appId: "1:610819138046:web:b87e56106081fb331a60af",
    measurementId: "G-HRDW5Q37J9"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
