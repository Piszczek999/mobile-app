export type ItemType = "ingredient" | "equipable" | "other";

export type Item = {
  id: string;
  name: string;
  type: ItemType;
  count: number;
  equipable: boolean;
  slot?: string;
  bonuses?: any;
};

export type DropItem = {
  id: string;
  name: string;
};

export type Character = {
  uid: string;
  name: string;
  level: number;
  exp: number;
  gold: number;
  weapon: Item;
  exploration: Exploration;
  armor: {
    head: Item;
    chest: Item;
    legs: Item;
  };
  inventory: Item[];
};

export type Map = {
  id: string;
  title: string;
  minLevel: number;
  duration: number;
  drop: DropItem[];
};

export type Exploration = {
  mapId: string;
  startTime: number;
  duration: number;
  completed: boolean;
};

export type Rewards = {
  exp: number;
  gold: number;
  items?: Item[];
  mapId: string;
};
