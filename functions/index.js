const functions = require("firebase-functions");
const admin = require("firebase-admin");

// const admin = admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// exports.getUsers = functions.https.onCall((request, response) => {
// return admin.firestore().collection("Users");
// });

// exports.updateStatus = functions.firestore
//   .document("users/{userId}")
//   .onUpdate((snapshot, context) => {
//     const data = snapshot.data();
//   });
