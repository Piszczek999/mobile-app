import { auth, db } from "./firebase.js";
import { createCharacter, getHead } from "./utils.js";

export async function createUser(email, name, password) {
  try {
    const { uid } = await auth.createUser({
      email: email,
      password: password,
      displayName: name,
    });

    const newCharacter = createCharacter(uid);

    await db.collection("characters").doc(uid).set(newCharacter);
    await db.collection("characterHeads").doc(uid).set(getHead(newCharacter));

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

export async function signIn(tokenId) {
  try {
    const { uid } = await auth.verifyIdToken(tokenId);
    return uid;
  } catch (error) {
    console.error(error);
    throw "An error occurred during sign in.";
  }
}
