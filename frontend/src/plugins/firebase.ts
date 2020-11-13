import firebase from 'firebase';

if (!firebase.apps.length) {
  // Please add your own API setting
  firebase.initializeApp({
    apiKey: '####',
    authDomain: '####',
    databaseURL: '####',
    projectId: '####',
    storageBucket: '####',
    messagingSenderId: '####',
    appId: '####',
    measurementId: '####',
  });
}

export default firebase;
