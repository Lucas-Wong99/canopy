import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCnBweNYGfpgNq0H7WIX9x1tWDmFF2No2s",
  authDomain: "canopy-1bb2b.firebaseapp.com",
  databaseURL: "https://canopy-1bb2b.firebaseio.com",
  projectId: "canopy-1bb2b",
  storageBucket: "canopy-1bb2b.appspot.com",
  messagingSenderId: "686680915728",
  appId: "1:686680915728:web:6e63e999b2f2487d926f95",
  measurementId: "G-QW1W58337W"
});

const db = firebaseApp.firestore();
const functions = firebaseApp.functions();
const auth = firebaseApp.auth();
const messaging = firebaseApp.messaging();

messaging.usePublicVapidKey(
  "BIv5b2jf7Xq2PT7nCpAyNBssko1Ey97z2W4kJJxSphL4PBd3bJg3D5X8sRO7hjzDfbV4kLlPbXBOratX72niN_M"
);

export { db, functions, auth, messaging };
