import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSIQ05LXnRDdJfErI-o1R_lfwYtjs-p4Q",
  authDomain: "mobile-game-5d397.firebaseapp.com",
  projectId: "mobile-game-5d397",
  storageBucket: "mobile-game-5d397.appspot.com",
  messagingSenderId: "225924723968",
  appId: "1:225924723968:web:edb67f43e17ed4c71c6fe5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const save = async (character, id) => {
  if (character == undefined) return;
  try {
    await setDoc(doc(db, "users", id), character);
  } catch (error) {
    console.error(error);
  }
};
