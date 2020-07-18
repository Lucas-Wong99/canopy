import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "YOUR KEYS HERE",
  authDomain: "YOUR KEYS HERE",
  databaseURL: "YOUR KEYS HERE",
  projectId: "YOUR KEYS HERE",
  storageBucket: "YOUR KEYS HERE",
  messagingSenderId: "YOUR KEYS HERE",
  appId: "YOUR KEYS HERE",
  measurementId: "YOUR KEYS HERE"
});

const db = firebaseApp.firestore();
const functions = firebaseApp.functions();
const auth = firebaseApp.auth();
const messaging = firebaseApp.messaging();

messaging.onMessage(function (payload) {
  const notification = new Notification(payload.notification.title, {
    icon: "canopyIcon512.png",
    body: payload.notification.body
  });
  notification.onClick = function () {
    window.open("https://canopy-1bb2b.firebaseapp.com/");
  };

  console.log("onMessage: ", payload);
  console.log(notification);
  //return notification
});

//???
messaging.usePublicVapidKey(
  "BIv5b2jf7Xq2PT7nCpAyNBssko1Ey97z2W4kJJxSphL4PBd3bJg3D5X8sRO7hjzDfbV4kLlPbXBOratX72niN_M"
);

export { db, functions, auth, messaging };
