import { Text } from "react-native";
import { Character } from "../types";
import Gradient from "./Gradient";

export default function Stats({ character }: { character: Character }) {
  const { uid, name, level, exp, gold, weapon, armor, inventory } = character;

  return (
    <Gradient
      colors={["#666", "#555"]}
      style={{
        flexGrow: 1,
        padding: 10,
      }}
    >
      <Text style={{ color: "white" }}>Name: {name}</Text>
      <Text style={{ color: "white" }}>Level: {level}</Text>
      <Text style={{ color: "white" }}>Exp: {exp}</Text>
      <Text style={{ color: "white" }}>Gold: {gold}</Text>
    </Gradient>
  );
}
