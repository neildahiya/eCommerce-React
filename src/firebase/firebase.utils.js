import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCtg4n7U2zDFdppuO3k0R0849tD2UW4AOQ",
  authDomain: "crwn-db-36555.firebaseapp.com",
  databaseURL: "https://crwn-db-36555.firebaseio.com",
  projectId: "crwn-db-36555",
  storageBucket: "crwn-db-36555.appspot.com",
  messagingSenderId: "557595421370",
  appId: "1:557595421370:web:9f76dbf9ecb3ee17157083",
  measurementId: "G-C7ZPB1TLCC",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user ", error.message);
    }
  }
  return userRef;
  //   console.log(snapShot);
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
