const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.newUser = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("Users").doc(user.uid).set({
    name: user.displayName,
    photoURL: user.photoURL,
    current_status: "Chillin"
  });
});

exports.addStatus = functions.https.onCall((data, context) => {
  const user = context.auth.token.name || null;
  const userId = context.auth.uid || null;
  const userStatus = data.status;
  const newStatus = admin.firestore().collection("Status").add({
    user_name: user,
    status: userStatus,
    date_created: admin.firestore.FieldValue.serverTimestamp(),
    claps: 0
  });
  const updateUser = admin.firestore().collection("Users").doc(userId).update({
    current_status: userStatus
  });
  const all = Promise.all([newStatus, updateUser]);
  return all
    .then(() => {
      return {
        text: "hello"
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.incrementClaps = functions.https.onCall((data, context) => {
  const status = admin.firestore().collection("Status").doc(data.id);

  return status
    .update({
      claps: admin.firestore.FieldValue.increment(1)
    })
    .then(() => {
      return {
        text: "hello"
      };
    })
    .catch((err) => {
      console.log("Error", err);
      return err;
    });
});

exports.getUserId = functions.https.onCall((data, context) => {
  console.log("USER ID", context.auth.token.name);
  return {
    userId: context.auth.token.name
  };
});

//POTENCIAL FUNCTION TO CALL WHEN AN UPDATE TO STATUS AND CAN ALSO SEND CLOUD MESSAGE TO USERS
exports.updateStatus = functions.firestore
  .document("Status/{StatusId}")
  .onCreate((snap, context) => {
    console.log("SNAP", snap);
    console.log("CONTEXT", context);
    const data = snap.data();
    const payload = {
      data: {
        user_name: data.user_name,
        status: data.status
      }
    };
    return admin.messaging().sendToTopic("user_status_updates", payload);
  });

// How does authentication relate to DB users?
// onCreate (status) --> Update User Current Status (which drives avatar status indicator color) --> Send cloud messages
