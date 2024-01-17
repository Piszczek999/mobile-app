export function validateCharacter(character) {
  return {
    name: character.name,
    level: character.level || 1,
    exp: character.exp || 0,
    gold: character.gold != undefined ? character.gold : 100,
    equipment: {
      head: character.equipment.head || null,
      chest: character.equipment.chest || null,
      legs: character.equipment.legs || null,
      boots: character.equipment.boots || null,
    },
  };
}
