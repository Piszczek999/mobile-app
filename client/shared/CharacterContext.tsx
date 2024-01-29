// CharacterContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Character } from "../types";

type CharacterContextProps = {
  character: Character | undefined;
  setCharacter: React.Dispatch<React.SetStateAction<Character | undefined>>;
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

  return (
    <CharacterContext.Provider value={{ character, setCharacter }}>
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
