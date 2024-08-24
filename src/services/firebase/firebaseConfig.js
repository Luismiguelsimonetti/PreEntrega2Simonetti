// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-bEEYLEHfSXRw1zRdxKNXl-tahjqqpXM",
  authDomain: "wimi-pasteleriaartesanal.firebaseapp.com",
  projectId: "wimi-pasteleriaartesanal",
  storageBucket: "wimi-pasteleriaartesanal.appspot.com",
  messagingSenderId: "914349093609",
  appId: "1:914349093609:web:ba51b2189de534a30ff678"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);