type ItemType = "ingredient" | "equipable" | "other";

export type DropItem = {
  count: number;
  chance: number;
} & Item;

export type Map = {
  id: string;
  duration: number;
  exp: number;
  gold: number;
  drop: DropItem[];
};

export type Maps = {
  [key: string]: Map;
};

export type Character = {
  uid: string;
  name: string;
  level: number;
  exp: number;
  gold: number;
  weapon: Item | null;
  exploration: Exploration | null;
  armor: {
    head: Item | null;
    chest: Item | null;
    legs: Item | null;
  };
  inventory: Item[];
};

export type Item = {
  id: string;
  name: string;
  type: ItemType;
  count: number;
  equipable: boolean;
  slot?: string;
  bonuses?: any;
};

export type Items = {
  [key: string]: Item;
};

export type Exploration = {
  mapId: string;
  startTime: number;
  duration: number;
  completed: boolean;
};
