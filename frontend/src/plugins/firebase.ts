import firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyA6_jk6DTjAYoVlmxHnpnTs-lfblbRPpic',
    authDomain: 'we-wanna-eat-jiro.firebaseapp.com',
    databaseURL: 'https://we-wanna-eat-jiro.firebaseio.com',
    projectId: 'we-wanna-eat-jiro',
    storageBucket: 'we-wanna-eat-jiro.appspot.com',
    messagingSenderId: '708654749698',
    appId: '1:708654749698:web:0ec9b6b9a9f14bc5dcef1b',
    measurementId: 'G-W7G2C5MWV0',
  });
}

export default firebase;
