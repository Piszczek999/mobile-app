import { maps } from "./constants.js";
import { save } from "./firestore.js";

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

export function explorationComplete(socket, ch) {
  console.log(ch);
  const map = maps[ch.exploration.mapId];
  ch.exp += map.exp + (Math.random() * map.exp) / 5;
  ch.gold += map.gold + (Math.random() * map.gold) / 5;

  const rewards = map.drop.map((item) => {
    let count = 0;
    for (let index = 0; index < item.count; index++) {
      const random = Math.random();
      if (random < item.chance) count++;
      console.log(random + " " + item.chance);
    }

    return count ? { count, id: item.id } : null;
  });
  console.log(rewards);

  ch.exploration = null;
  save(ch);

  socket.emit("alert", "Exploration Completed");
  socket.emit("updateCharacter", ch);
}
