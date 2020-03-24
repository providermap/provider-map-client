// Firebase App (the core Firebase SDK) and analytics/firestore
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAD0VZwaFtj5KGiR86cxo3ijEKW98sqSM",
  authDomain: "provider-map-fdf85.firebaseapp.com",
  databaseURL: "https://provider-map-fdf85.firebaseio.com",
  projectId: "provider-map-fdf85",
  storageBucket: "provider-map-fdf85.appspot.com",
  messagingSenderId: "133501023006",
  appId: "1:133501023006:web:4c728867dade16aa9a8f0f",
  measurementId: "G-0VPN9J90H2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
const db = firebase.firestore();

export { db };