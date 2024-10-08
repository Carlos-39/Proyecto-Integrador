// authentication management

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // database service

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFkCO_ZmD1utjHagPJ5BidVYjKvcU6ruw",
  authDomain: "pi-proyecto-agua.firebaseapp.com",
  projectId: "pi-proyecto-agua",
  storageBucket: "pi-proyecto-agua.appspot.com",
  messagingSenderId: "948735081651",
  appId: "1:948735081651:web:b92a58a39256261ec944c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app) // database service