console.log("HELLOOOO");
importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"
);
// console.log("SERVICE WORKER!!!!!");
const config = {
  apiKey: "YOUR KEYS HERE",
  authDomain: "YOUR KEYS HERE",
  databaseURL: "YOUR KEYS HERE",
  projectId: "YOUR KEYS HERE",
  storageBucket: "YOUR KEYS HERE",
  messagingSenderId: "YOUR KEYS HERE",
  appId: "YOUR KEYS HERE",
  measurementId: "YOUR KEYS HERE"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});

self.addEventListener("notificationclick", function (event) {
  console.log("Hey this might be a background SW log?");
  // do what you want
  // ...
});

// messaging.setBackgroundMessageHandler(function (payload) {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/firebase-logo.png"
//   };

//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });

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
