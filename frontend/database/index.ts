import firebase from './../plugins/firebase'


export const categories = async () => {
    const db = firebase.firestore();
    return db.collection('categories');
}