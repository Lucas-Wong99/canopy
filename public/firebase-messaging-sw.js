console.log("HELLOOOO");
importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"
);
// console.log("SERVICE WORKER!!!!!");
const config = {
  apiKey: "AIzaSyCnBweNYGfpgNq0H7WIX9x1tWDmFF2No2s",
  authDomain: "canopy-1bb2b.firebaseapp.com",
  databaseURL: "https://canopy-1bb2b.firebaseio.com",
  projectId: "canopy-1bb2b",
  storageBucket: "canopy-1bb2b.appspot.com",
  messagingSenderId: "686680915728",
  appId: "1:686680915728:web:6e63e999b2f2487d926f95",
  measurementId: "G-QW1W58337W"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

//   // const promiseChain = clients
//   // .matchAll({
//   // type: "window",
//   // includeUncontrolled: true
//   // })
//   // .then((windowClients) => {
//   // for (let i = 0; i < windowClients.length; i++) {
//   // const windowClient = windowClients[i];
//   // windowClient.postMessage(payload);
//   // }
//   // })
//   // .then(() => {
//   // return registration.showNotification("my notification title");
//   // });
//   //return promiseChain;
// });
// self.addEventListener("notificationclick", function (event) {
//   console.log(event);
// });
