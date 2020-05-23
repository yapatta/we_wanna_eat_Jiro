import firebase from '../plugins/firebase';
import {
  CategoryDocument,
  RoomCardProp,
  RoomDocument,
  UserDocument,
} from './model';

export const selectCategories = async () => {
  const db = firebase.firestore();
  return db.collection('categories');
};

export const selectCategory = async (cid: number) => {
  const db = firebase.firestore();
  return db.collection('categories').doc(`${cid}`);
};

export const selectRoomDocuments = async (cid: number) => {
  const db = firebase.firestore();
  return db.collection('categories').doc(`${cid}`).collection('rooms');
};
export const selectRoomDocument = async (cid: number, docId: string) => {
  const db = firebase.firestore();
  return db
    .collection('categories')
    .doc(`${cid}`)
    .collection('rooms')
    .doc(docId);
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

export const insertUser = async (userDoc: UserDocument) => {
  const db = firebase.firestore();
  const docRef = db.collection('users').doc(userDoc.uid);
  await docRef.set(userDoc);
};

export const isCreatedUser = async (uid: string) => {
  const db = firebase.firestore();
  const user = await db.collection('users').doc(uid).get();
  return user.exists;
};

export const selectUser = async (uid: string) => {
  const db = firebase.firestore();
  const user = await db.collection('users').doc(uid).get();
  return user.data() as UserDocument;
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

export const updateUsername = async (uid: string, nickname: string) => {
  const db = firebase.firestore();
  await db.collection('users').doc(uid).update({
    nickname,
  });
};

export const getRoomCardProps = async (cid: number) => {
  const rooms = await (await selectRoomDocuments(cid)).get();
  const roomCardProps: RoomCardProp[] = [];
  rooms.forEach((doc) => {
    const rcp: RoomCardProp = {
      ...(doc.data() as RoomDocument),
      cid: cid,
      rid: doc.id,
      userNum: doc.data().users.length,
    };
    roomCardProps.push(rcp);
  });
  return roomCardProps;
};

/**
 *
 * @param cid
 * @param roomId 別名 docIdとも言う。
 */
export const deleteRoomDelete = async (cid: number,roomId: string) => {
  const db = firebase.firestore();
  await db
      .collection('categories')
      .doc(`${cid}`)
      .collection('rooms')
      .doc(roomId).delete();
}
