
import firebase from 'firebase';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyBCTUDGs3SAzmBQUOv-kQq7s_PYaWOpdio',
        authDomain: 'pj-marowd.firebaseapp.com',
        databaseURL: 'https://pj-marowd.firebaseio.com',
        projectId: 'pj-marowd',
        storageBucket: 'pj-marowd.appspot.com',
        messagingSenderId: '878555019849',
        appId: '1:878555019849:web:22d4242096f12135'
    });
}

export default firebase;