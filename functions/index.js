const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.newUser = functions.auth.user().onCreate((user) => {
  console.log(user);
  return admin.firestore().collection("Users").doc(user.uid).set({
    name: user.displayName,
    photoURl: user.photoURL,
    current_status: "Chillin"
  });
});

exports.addStatus = functions.https.onCall((data, context) => {
  const user = context.auth.token.name || null;
  const userStatus = data.status;
  return admin
    .firestore()
    .collection("Status")
    .add({
      user_name: user,
      status: userStatus,
      date_created: admin.firestore.FieldValue.serverTimestamp(),
      claps: 0
    })
    .then((res) => {
      console.log(res);
      return {
        user_name: user
      };
    })
    .catch((err) => {
      console.log("Error! Status was not created");
      return {
        message: err.message
      };
    });
});

exports.updateUserStatus = functions.firestore
  .document("Status/{statusId}")
  .onCreate((snap, context) => {
    console.log(snap.data());
    const data = snap.data().status;
    // const user = context.auth.token.name;

    return admin.firestore().collection("Users/{HhtnPYnJjRYKgc20GIvE}").update({
      current_status: data
    });
  });

//POTENCIAL FUNCTION TO CALL WHEN AN UPDATE TO STATUS AND CAN ALSO SEND CLOUD MESSAGE TO USERS
// exports.updateStatus = functions.firestore
//   .document("Users/{UsersId}")
//   .onUpdate((change) => {
//     const after = change.after.data();
// const payload = {
//   data: {
//     firstName: after.firstName,
//     lastName: after.lastName,
//     status: after.status
//   }
// };
// return admin.messaging().sendToTopic("user_status_updates", payload);
// });

// How does authentication relate to DB users?
// onCreate (status) --> Update User Current Status (which drives avatar status indicator color) --> Send cloud messages
