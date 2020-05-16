import firebase from './../plugins/firebase'
import {RoomDocument, UserDocument} from "./model";


export const selectCategories = async () => {
    const db = firebase.firestore();
    return db.collection('categories');
}

export const selectRoomDocument = async (cid: number) => {
    const db = firebase.firestore();
    return db.collection('categories').doc(`${cid}`).collection('room');
}

export const insertRoomDocument = async (cid: number,RoomDocument: RoomDocument) => {
    const db = firebase.firestore();
    await db.collection('categories').doc(`${cid}`).collection('room').add(RoomDocument);
}

export const updateRoomDocumentWhenJoined = async (cid: number,docId: string,UserDocument: UserDocument) => {
    const db = firebase.firestore();
    await db.collection('categories').doc(`${cid}`).collection('room').doc(docId).update({
        users: firebase.firestore.FieldValue.arrayUnion(UserDocument)
    });
}

export const updateRoomDocumentWhenLeaved = async (cid: number,docId: string,UserDocument: UserDocument) => {
    const db = firebase.firestore();
    await db.collection('categories').doc(`${cid}`).collection('room').doc(docId).update({
        users: firebase.firestore.FieldValue.arrayRemove(UserDocument)
    });
}