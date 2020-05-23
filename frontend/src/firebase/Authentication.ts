import firebase from '../plugins/firebase';
import { UserDocument } from '../database/model';
import { insertUser, isCreatedUser } from '../database';
import {randomString} from "../utils";

export function getCurrentUser(): Promise<firebase.User | boolean> {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      resolve(user || false);
    });
  });
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
      peerId: `dummy-${randomString()}`
    };
    await insertUser(userDoc);
  }
};

export const handleLogout = async () => {
  await firebase.auth().signOut();
};
