import firebase from './../plugins/firebase'
import {Room, User} from "./model";


export const categories = async () => {
    const db = firebase.firestore();
    return db.collection('categories');
}

export const rooms = async (cid: number) => {
    const db = firebase.firestore();
    return db.collection('categories').doc(`${cid}`).collection('rooms');
}

export const createRoom = async (cid: number,room: Room) => {
    const db = firebase.firestore();
    await db.collection('categories').doc(`${cid}`).collection('rooms').add(room);
}

export const joinRoom = async (cid: number,docId: string,user: User) => {
    const db = firebase.firestore();
    await db.collection('categories').doc(`${cid}`).collection('rooms').doc(docId).update({
        users: firebase.firestore.FieldValue.arrayUnion(user)
    });
}

export const leaveRoom = async (cid: number,docId: string,user: User) => {
    const db = firebase.firestore();
    await db.collection('categories').doc(`${cid}`).collection('rooms').doc(docId).update({
        users: firebase.firestore.FieldValue.arrayRemove(user)
    });
}