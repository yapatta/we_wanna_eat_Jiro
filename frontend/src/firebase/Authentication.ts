import firebase from "../../plugins/firebase";

const db = firebase.firestore();

export function getCurrentUser(): firebase.User {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw Error("failed to get current user from firebase auth sdk");
  }

  return currentUser;
}

export function getUid(): string {
  return getCurrentUser().uid;
}

export async function isUser(uid: string): Promise<boolean> {
  const user = await db.collection("users").doc(uid).get();

  return user.exists;
}

async function createUser(uid: string): Promise<void> {
  const docRef = db.collection("users").doc(uid);

  await docRef.set({
    Id: docRef.id,
  });
}

export const handleGoogleLogin = async () => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(googleAuthProvider);
  const uid = result.user?.uid;

  let _isUser: boolean = false;
  if (uid != null) {
    _isUser = await isUser(uid);

    if (!_isUser) {
      await createUser(uid);
    }

    return uid;
  }
};

export const handleLogout = async () => {
  await firebase.auth().signOut();
};
