import firebase from '../plugins/firebase';
import { CategoryDocument, RoomDocument, UserDocument } from './model';

export const selectCategories = async () => {
  const db = firebase.firestore();
  return db.collection('categories');
};

export const selectCategory = async (cid: number) => {
  const db = firebase.firestore();
  return db.collection('categories').doc(`${cid}`);
};

export const selectRoomDocument = async (cid: number) => {
  const db = firebase.firestore();
  return db.collection('categories').doc(`${cid}`).collection('rooms');
};

export const selectUserDocument = async (id: string) => {
  const db = firebase.firestore();
  return db.collection('users').doc(id);
};

export const insertRoomDocument = async (
  cid: number,
  RoomDocument: RoomDocument,
) => {
  const db = firebase.firestore();
  return await db
    .collection('categories')
    .doc(`${cid}`)
    .collection('rooms')
    .add(RoomDocument);
};

export const updateRoomDocumentWhenJoined = async (
  cid: number,
  docId: string,
  UserDocument: UserDocument,
) => {
  const db = firebase.firestore();
  await db
    .collection('categories')
    .doc(`${cid}`)
    .collection('rooms')
    .doc(docId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion(UserDocument),
    });
};

export const updateRoomDocumentWhenLeaved = async (
  cid: number,
  docId: string,
  UserDocument: UserDocument,
) => {
  const db = firebase.firestore();
  await db
    .collection('categories')
    .doc(`${cid}`)
    .collection('rooms')
    .doc(docId)
    .update({
      users: firebase.firestore.FieldValue.arrayRemove(UserDocument),
    });
};

export const _insertCategoryDocument = async (
  docId: number,
  categoryDocument: CategoryDocument,
) => {
  const db = firebase.firestore();
  return await db
    .collection('categories')
    .doc(`${docId}`)
    .set(categoryDocument);
};
