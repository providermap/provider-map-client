// Firebase App (the core Firebase SDK) and analytics/firestore
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqDXqMT_fCnbmDKpj4CgCal3UBrjR_OaQ",
  authDomain: "provider-map-website.firebaseapp.com",
  databaseURL: "https://provider-map-website.firebaseio.com",
  projectId: "provider-map-website",
  storageBucket: "provider-map-website.appspot.com",
  messagingSenderId: "515646226921",
  appId: "1:515646226921:web:af04162e200c48c6b18b78",
  measurementId: "G-KD4PZ97Y1S"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
const db = firebase.firestore();

export { db };