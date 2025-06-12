import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCz7cHymUyMeV80sWONaIl4ikm3XkD3jB0",
  authDomain: "fir-learning-f2388.firebaseapp.com",
  projectId: "fir-learning-f2388",
  storageBucket: "fir-learning-f2388.firebasestorage.app",
  messagingSenderId: "715628617125",
  appId: "1:715628617125:web:e2f158fe7905e5ff171c4c",
  measurementId: "G-QYDNN3FLLR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)