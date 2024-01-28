import { Maps } from "./types";

export const maps: Maps = {
  fields: {
    id: "fields",
    duration: 1 * 60 * 1000,
    exp: 100,
    gold: 10,
    drop: [
      {
        id: "deerhorns",
        count: 3,
        chance: 0.2,
      },
      {
        id: "flint",
        count: 3,
        chance: 0.2,
      },
    ],
  },
  mountains: {
    id: "mountains",
    duration: 1 * 60 * 1000,
    exp: 500,
    gold: 25,
    drop: [],
  },
};
