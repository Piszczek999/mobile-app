import { db } from "./firebase.js";

export function validateCharacter(character) {
  return {
    ...character,
    uid: character.uid,
    name: character.name,
    level: character.level || 1,
    exp: character.exp || 0,
    gold: character.gold != undefined ? character.gold : 100,
    weapon: character.weapon || null,
    armor: {
      head: character.armor?.head || null,
      chest: character.armor?.chest || null,
      legs: character.armor?.legs || null,
    },
    inventory: character.inventory || {},
  };
}

export function createCharacter(uid) {
  return {
    uid: uid,
    name: uid,
    level: 1,
    exp: 0,
    gold: 100,
    weapon: null,
    armor: {
      head: null,
      chest: null,
      legs: null,
    },
    inventory: {},
  };
}

export function getHead(character) {
  return {
    uid: character.uid,
    level: character.level,
    name: character.name,
  };
}
