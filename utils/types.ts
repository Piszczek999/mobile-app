export type ItemType = "ingredient" | "equipable" | "other";

export type Character = {
  uid: string;
  name: string;
  level: number;
  exp: number;
  gold: number;
  stats: Stats;
  exploration: Exploration | null;
  equipment: Equipment;
  inventory: Item[];
};

export type CharacterHead = {
  uid: string;
  name: string;
  level: number;
};

export type Stats = {
  attack: number;
  defense: number;
};

export type Exploration = {
  mapId: string;
  startTime: number;
  duration: number;
  completed: boolean;
};

export type Equipment = {
  head: Item | null;
  chest: Item | null;
  boots: Item | null;
  weapon: Item | null;
  shield: Item | null;
  bracelet: Item | null;
  trinket: Item | null;
};

export type Item = {
  id: string;
  name: string;
  type: ItemType;
  count: number;
  equipable: boolean;
  slot?: string;
  bonuses?: Bonuses;
};

export type RequiredItem = {
  id: string;
  name: string;
  count: number;
};

export type DropItem = {
  id: string;
  name: string;
  bonuses?: Bonuses;
};

export type Bonuses = {
  attack?: number;
  defense?: number;
};

export type Map = {
  id: string;
  title: string;
  minLevel: number;
  duration: number;
  drop: DropItem[];
  dungeon: boolean;
  requiredItem?: RequiredItem;
};

export type Rewards = {
  exp: number;
  gold: number;
  items?: Item[];
  mapId: string;
};
