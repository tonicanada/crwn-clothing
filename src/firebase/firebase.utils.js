import firebase, { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCtmT48AqYJbXxBEUDbciH9eWC9wumYdAk",
  authDomain: "crwn-db-9e4d0.firebaseapp.com",
  databaseURL: "https://crwn-db-9e4d0.firebaseio.com",
  projectId: "crwn-db-9e4d0",
  storageBucket: "crwn-db-9e4d0.appspot.com",
  messagingSenderId: "626823924715",
  appId: "1:626823924715:web:18222dd308c39b2608e7ae",
  measurementId: "G-R6BPVGT43M"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
