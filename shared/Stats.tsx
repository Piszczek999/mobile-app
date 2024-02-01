import { Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Character } from "../types";
import Tile from "./Tile";

export default function Stats({ character }: { character: Character }) {
  const { uid, name, level, exp, gold, weapon, armor, inventory } = character;

  return (
    <View style={{ flexGrow: 1 }}>
      <Shadow startColor="#0005" offset={[2, 2]} stretch distance={3}>
        <Tile
          colors={["#666", "#555"]}
          style={{
            padding: 10,
            flexDirection: "column", // Ensure text components stack vertically
            flexGrow: 0,
            overflow: "hidden",
          }}
        >
          <Text style={{ color: "white" }}>Name: {name}</Text>
          <Text style={{ color: "white" }}>Level: {level}</Text>
          <Text style={{ color: "white" }}>Exp: {Math.floor(exp)}</Text>
          <Text style={{ color: "white" }}>Gold: {Math.floor(gold)}</Text>
        </Tile>
      </Shadow>
    </View>
  );
}
