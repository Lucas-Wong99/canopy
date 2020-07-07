const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've succesfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

exports.addStatus = functions.https.onCall((data, context) => {
  const user = context.auth.token.name || null;
  const userStatus = data.status;
  // if (!(typeof userStatus === "string")) {
  //   throw new functions.https.HttpsError(
  //     "invalid-argument",
  //     "Type must be string"
  //   );
  // }
  // if (!context.auth) {
  //   throw new functions.https.HttpsError(
  //     "failed-precondition",
  //     "User must be logged in in order have a status"
  //   );
  // }
  return admin
    .firestore()
    .collection("Status")
    .add({
      user_name: user,
      status: userStatus,
      date_created: admin.firestore.FieldValue.serverTimestamp(),
      claps: 0,
    })
    .then((res) => {
      console.log("New status created");
      return res;
    })
    .catch((err) => {
      console.log("Error! Status was not created");
      return err;
    });
});

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
