import firebase from '../plugins/firebase';
import { UserDocument } from '../database/model';
import { insertUser, isCreatedUser } from '../database';

export function getCurrentUser(): firebase.User {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw Error('failed to get current user from firebase auth sdk');
  }

  return currentUser;
}

export function getUid(): string {
  return getCurrentUser().uid;
}

export const handleGoogleLogin = async () => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(googleAuthProvider);
  const uid = result.user?.uid;
  // DB側に作成されていないユーザの場合は作成する。
  if (!!uid && !(await isCreatedUser(uid))) {
    const userObj = result.user as firebase.User;
    const userDoc: UserDocument = {
      uid: userObj.uid,
      nickname: userObj.displayName,
      introduction: '初めまして！よろしくお願いします！',
      evaluation: 3,
    };
    await insertUser(userDoc);
  }
};

export const handleLogout = async () => {
  await firebase.auth().signOut();
};
