# Welcome to the Canopy

Canopy is a workflow enhancement tool for remote teams to stay connected and build a culture of healthy work habits. 

This project built with love by [Em Pascas](https://github.com/Avec-em), [Lucas Wong](https://github.com/Lucas-Wong99), and [Daniel Huss](https://github.com/Daniel-N-Huss)

## Tech Stack
Bootstrapped with [Create React App](https://github.com/facebook/create-react-app), Canopy is a cloud native, serverless, progressive web app built on the Google Firebase platform.


## Images

![landing](https://github.com/Lucas-Wong99/canopy/blob/master/docs/landing.png?raw=true)

![full view](https://github.com/Lucas-Wong99/canopy/blob/master/docs/Full%20View.png?raw=true)


## Getting started with Canopy

Canopy is a cloud-native app, and requires integration with Google Cloud Firebase. To get going, head over [to the console](https://console.firebase.google.com/) and create a new project. Google has excellent [documentation to get you started](https://firebase.google.com/docs/web/setup). 

You will need to select four addons when you create your project:
1. Google Authentication
2. Cloud Firestore
3. Cloud Messaging
4. Cloud Functions

After creating your own firebase project, **you will need to:**

Clone Canopy to your machine.

In the main directory of the project:

```js
npm install firebase

npm install

npm firebase init
```

Follow the Firebase init console instructions.

On your Firebase project dashboard, head into *Project Settings*, located under the gear icon beside the *Project Overview* link on the left nav bar.
![get project settings](https://github.com/Lucas-Wong99/canopy/blob/master/docs/getProjectInfo.png?raw=true)

At the bottom of the project settings page, you will find the Firebase SDK config details for your project.
![get project config](https://github.com/Lucas-Wong99/canopy/blob/master/docs/getConfig.png?raw=true) 

Copy that info into two places in the Canopy codebase:

1. firebase-messaging-sw.js in the Public folder
2. firebase.js in the src folder


After your own config is present, you can deploy the cloud functions to your firebase project with:
```
firebase deploy --only functions
```


### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The progressive web application features will require a production build, which you can create and access with:

```
npm run build

npm run start-sw
```



## Project Dependencies:

- Firebase
- React
- Material-UI
- Moment
- Polished
- Chartjs
- React Chartjs

### Dev Dependencies

- http-server



## More views:
More project photos can be found [here](https://github.com/Lucas-Wong99/canopy/tree/master/docs).
