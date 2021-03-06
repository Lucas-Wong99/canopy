import { auth } from "../../firebase";
import firebase from "firebase";

var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
  auth
    .signInWithPopup(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log("token", token);
      console.log("user", user);
      console.log("auth", auth);
    })
    .catch(function (error) {
      console.log(error.code);
      console.log(error.message);
    });
}

export function googleSignout() {
  auth
    .signOut()

    .then(
      function () {
        console.log("Signout Succesfull");
      },
      function (error) {
        console.log("Signout Failed");
      }
    );
}

export default googleSignin;
