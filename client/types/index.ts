import { ImageSourcePropType } from "react-native";

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
  image: ImageSourcePropType;
  minLevel: number;
  duration: number;
};

export type Exploration = {
  mapId: string;
  startTime: number;
  duration: number;
};
