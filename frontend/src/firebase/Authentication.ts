import firebase from "../../plugins/firebase";

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
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

async function isUser(uid: string): Promise<boolean> {
  const user = await db
    .collection("users")
    .doc(uid)
    .get();

  return user.exists;
}

async function createUser(
  uid: string,
  accessToken: string,
  secretKey: string
): Promise<void> {
  const docRef = db.collection("users").doc(uid);

  await docRef.set({
    Id: docRef.id,
    AccessToken: accessToken,
    SecretKey: secretKey
  });
}

export const handleLogin = async () => {
  const result = await firebase.auth().signInWithPopup(googleAuthProvider);
  const uid = result.user?.uid;
  const accessToken = (result.credential as any).accessToken;
  const secret = (result.credential as any).secret;

  let _isUser: boolean = false;
  if (uid != null) {
    _isUser = await isUser(uid);

    if (!_isUser) {
      await createUser(uid, accessToken, secret);
    }
  }
};

export const handleLogout = () => {
  firebase.auth().signOut();
};
