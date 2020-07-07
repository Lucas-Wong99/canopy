const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.addStatus;
// exports.getUsers = functions.https.onCall((request, response) => {
// return admin.firestore().collection("Users");
// });

// exports.statusChanges = functions.firestore
//   .document("Status/{statusId}")
//   .onCreate((doc) => {
//     const status = doc.data();
//     const notification = {
//       content: "Added a new status",
//       user: `${status.user_name}`,
//       time: admin.firestore.FieldValue.serverTimestamp()
//     };
//   });

//POTENCIAL FUNCTION TO CALL WHEN AN UPDATE TO STATUS AND CAN ALSO SEND CLOUD MESSAGE TO USERS
// exports.updateStatus = functions.firestore
//   .document("Users/{UsersId}")
//   .onUpdate((change) => {
//     const after = change.after.data();

//     const payload = {
//       data: {
//         firstName: after.firstName,
//         lastName: after.lastName,
//         status: after.status
//       }
//     };
//     return admin.messaging().sendToTopic("user_status_updates", payload);
//   });
