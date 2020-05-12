import firebase from './../plugins/firebase'


export const categories = async () => {
    const db = firebase.firestore();
    return db.collection('categories');
}

export const rooms = async (cid: number) => {
    const db = firebase.firestore();
    return db.collection('categories').doc(`${cid}`).collection('rooms');
}