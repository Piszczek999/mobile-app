import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { validateCharacter } from "./utils.js";

export async function createUser(email, name, password) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const newCharacterHead = {
      uid: user.uid,
      name: name,
      level: 1,
    };

    const newCharacter = {
      uid: user.uid,
      name: name,
      level: 1,
      exp: 0,
      gold: 100,
      weapon: null,
      armor: { head: null, chest: null, legs: null, boots: null },
      inventory: {},
    };

    await setDoc(doc(db, "characters", user.uid), newCharacter);
    await setDoc(doc(db, "characterHeads", user.uid), newCharacterHead);

    return newCharacter;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      throw "Email is already in use.";
    } else {
      console.error(error);
      throw "An error occurred during user creation.";
    }
  }
}

export async function signIn(email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const character = await getDoc(doc(db, "characters", user.uid));
    character = validateCharacter(res.data());
    socket.emit("logged", character);
  } catch (error) {
    if (
      error.code === "auth/invalid-email" ||
      error.code === "auth/missing-password" ||
      error.code === "auth/invalid-credential"
    ) {
      throw "Invalid email or password. Please try again.";
    } else {
      console.error(error);
      throw "An error occurred.";
    }
  }
}
