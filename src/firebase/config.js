// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz7cHymUyMeV80sWONaIl4ikm3XkD3jB0",
  authDomain: "fir-learning-f2388.firebaseapp.com",
  projectId: "fir-learning-f2388",
  storageBucket: "fir-learning-f2388.firebasestorage.app",
  messagingSenderId: "715628617125",
  appId: "1:715628617125:web:e2f158fe7905e5ff171c4c",
  measurementId: "G-QYDNN3FLLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);