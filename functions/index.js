const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

//Cloud function that authenticates a user and creates a user in firestore with
//the doc id linking to the auth id
exports.newUser = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("Users").doc(user.uid).set({
    name: user.displayName,
    photoURL: user.photoURL,
    current_status: "Chillin",
    deviceToken: "",
  });
});

//A Cloud Function to add status to status collection, as well as update current_status in user collection.
exports.addStatus = functions.https.onCall((data, context) => {
  const user = context.auth.token.name || null;
  const userId = context.auth.uid || null;
  const userStatus = data.status;
  const newStatus = admin.firestore().collection("Status").add({
    user_name: user,
    status: userStatus,
    date_created: admin.firestore.FieldValue.serverTimestamp(),
    claps: 0,
  });
  const updateUser = admin.firestore().collection("Users").doc(userId).update({
    current_status: userStatus,
  });
  const all = Promise.all([newStatus, updateUser]);
  return all
    .then(() => {
      return {
        text: "hello",
      };
    })
    .catch((err) => {
      return err;
    });
});

//A Cloud Function that increments the amount of claps for a specific status
exports.incrementClaps = functions.https.onCall((data, context) => {
  const status = admin.firestore().collection("Status").doc(data.id);

  return status
    .update({
      claps: admin.firestore.FieldValue.increment(1),
    })
    .then(() => {
      return {
        text: "hello",
      };
    })
    .catch((err) => {
      console.log("Error", err);
      return err;
    });
});

//A Cloud Function to get userID from User Collection in firestore
exports.getUserId = functions.https.onCall((data, context) => {
  console.log("USER ID", context.auth.token.name);
  return {
    userId: context.auth.token.name,
  };
});

//A Cloud Function to save a device token of the current user in firestore
exports.sendTokenToFirestore = functions.https.onCall((data, context) => {
  const token = data.token;
  const current_userId = context.auth.uid || null;
  return admin
    .firestore()
    .collection("Users")
    .doc(current_userId)
    .update({
      deviceToken: token,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

//Sending a message to a specific user by accessing their id from "data" and message fromdata
exports.sendMessage = functions.https.onCall((data, context) => {
  const token = data.token;

  var message = {
    notification: {
      title: "Nudge!!",
      body: "from:" + context.auth.token.name,
    },
    token: token,
  };

  return admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      return response;
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      return error;
    });
});

//A cloud function to increase water consumption for the day
exports.addWater = functions.https.onCall((data, context) => {
  const user = context.auth.token.name || null;
  const newWater = admin.firestore().collection("Water").add({
    user_name: user,
    date_created: admin.firestore.FieldValue.serverTimestamp(),
  });
  return newWater
    .then(() => {
      return {
        text: "hello",
      };
    })
    .catch((error) => {
      return error;
    });
});

// The topic name can be optionally prefixed with "/topics/".

//POTENCIAL FUNCTION TO CALL WHEN AN UPDATE TO STATUS AND CAN ALSO SEND CLOUD MESSAGE TO USERS
// exports.updateStatus = functions.firestore
//   .document("Status/{StatusId}")
//   .onCreate((snap, context) => {
//     console.log("SNAP", snap);
//     console.log("CONTEXT", context);
//     const data = snap.data();
//     const payload = {
//       data: {
//         user_name: data.user_name,
//         status: data.status
//       }
//     };
//     return admin.messaging().sendToTopic("user_status_updates", payload);
//   });

// How does authentication relate to DB users?
// onCreate (status) --> Update User Current Status (which drives avatar status indicator color) --> Send cloud messages
