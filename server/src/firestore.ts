import { db } from "./firebase";
import { Character } from "./types";
import { createCharacter } from "./utils";

export const save = async (character: Character) => {
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

export async function getCharacter(uid: string) {
  try {
    const res = await db.collection("characters").doc(uid).get();
    const character = res.data() as Character;
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
