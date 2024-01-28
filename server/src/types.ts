export type DropItem = {
  id: string;
  count: number;
  chance: number;
};

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

export type Item =
  | {
      id: string;
      name: string;
      type: string;
      slot: string;
      bonuses: any;
    }
  | {
      id: string;
      name: string;
      type: string;
      count: number;
    };

export type Exploration = {
  mapId: string;
  startTime: number;
  duration: number;
};
