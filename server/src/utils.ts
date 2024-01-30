import { MAPS } from "./constants";
import { Character, Item } from "./types";

export function validateCharacter(character: Character) {
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

export function createCharacter(uid: string): Character {
  return {
    uid: uid,
    name: uid,
    level: 1,
    exp: 0,
    gold: 100,
    weapon: null,
    exploration: null,
    armor: {
      head: null,
      chest: null,
      legs: null,
    },
    inventory: [],
  };
}

export function getHead(character: Character) {
  return {
    uid: character.uid,
    level: character.level,
    name: character.name,
  };
}

export function receiveRewards(ch: Character) {
  if (!ch.exploration) return;
  const map = MAPS[ch.exploration.mapId];
  ch.exp += map.exp + (Math.random() * map.exp) / 5;
  ch.gold += map.gold + (Math.random() * map.gold) / 5;

  const rewards: (Item | null)[] = map.drop
    .map((dropItem) => {
      let successCount = 0;
      for (let index = 0; index < dropItem.count; index++) {
        if (Math.random() < dropItem.chance) successCount++;
      }
      const { chance, count, ...item } = dropItem;
      return successCount ? { ...item, count } : null;
    })
    .filter((item) => item !== null);

  rewards.forEach((reward) => {
    if (!reward) return;
    if (reward.equipable) {
      ch.inventory.push(reward);
    } else {
      const existingItem = ch.inventory.find((item) => item.id === reward.id);

      if (existingItem) {
        if (existingItem.count) existingItem.count += reward.count;
      } else {
        ch.inventory.push(reward);
      }
    }
  });

  ch.exploration = null;
}

export const explorationComplete = (ch: Character) => {
  if (!ch.exploration) return;
  ch.exploration.completed = true;
};
