// Firebase App (the core Firebase SDK) and analytics/firestore
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import ReduxSagaFirebase from "redux-saga-firebase";


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
const db = firebase.firestore();

const rsf = new ReduxSagaFirebase(firebaseApp);

export { db, rsf };