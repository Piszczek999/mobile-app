// CharacterContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Character, Rewards } from "../utils/types";

type CharacterContextProps = {
  character: Character | undefined;
  setCharacter: React.Dispatch<React.SetStateAction<Character | undefined>>;
  rewards: Rewards | undefined;
  setRewards: React.Dispatch<React.SetStateAction<Rewards | undefined>>;
};

const CharacterContext = createContext<CharacterContextProps | undefined>(
  undefined
);

type CharacterProviderProps = {
  children: ReactNode;
};

export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [character, setCharacter] = useState<Character | undefined>();
  const [rewards, setRewards] = useState<Rewards | undefined>();

  return (
    <CharacterContext.Provider
      value={{ character, setCharacter, rewards, setRewards }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);

  if (!context) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }

  return context;
};
