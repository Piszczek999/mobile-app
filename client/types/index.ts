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
  armor: {
    head: Item;
    chest: Item;
    legs: Item;
  };
  inventory: Item[];
};

export type Map = {
  title: string;
  image: ImageSourcePropType;
  minLevel: number;
  duration: number;
};
