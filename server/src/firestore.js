import { db } from "./firebase.js";
import { createCharacter, validateCharacter } from "./utils.js";

export const save = async (character) => {
  if (character == undefined) return;

  try {
    await db.collection("characters").doc(character.uid).set(character);
    await db.collection("characterHeads").doc(character.uid).set({
      uid: character.uid,
      level: character.level,
      name: character.name,
    });
  } catch (error) {
    console.error(error);
  }
};

export async function getCharacter(uid) {
  try {
    const res = await db.collection("characters").doc(uid).get();
    const character = res.data();
    if (!character) {
      const newCharacter = createCharacter(uid);
      await save(newCharacter);
      return newCharacter;
    }
    return character;
  } catch (error) {
    console.error(error);
    throw "An error occurred during getting character.";
  }
}
